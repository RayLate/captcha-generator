import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ReCaptchaContext = createContext({
  data: { id: '', img: '', question: '', height: 1, width: 1 },
  captchaId: 1,
  setCaptchaId: () => {},
  setResultId: () => {},
  answerPayload: { id: '', answer: [] },
  resetAnswerPayload: () => {},
  addAnswer: () => {},
  removeAnswer: () => {},
  showQuestion: false,
  setShowQuestion: () => {},
  result: { score: 0, success: false },
  resetResult: () => {},
});

const APP_IP = '';

export const ReCaptchaProvider = ({ children }) => {
  const [data, setData] = useState({
    id: '',
    img: '',
    question: 'title # keyword # instruction',
    height: 1,
    width: 1,
  });
  const [answerPayload, setAnswerPayload] = useState({
    id: '',
    answer: [],
  });
  const [result, setResult] = useState({ score: 0, success: false });
  const [showQuestion, setShowQuestion] = useState(false);
  const [captchaId, setCaptchaId] = useState('1');

  const addAnswer = (newAnswer) => {
    // console.log(newAnswer, answer.includes(newAnswer));
    if (!answerPayload.answer.includes(newAnswer)) {
      setAnswerPayload((prev) => {
        return {
          ...prev,
          answer: [...prev.answer, newAnswer],
        };
      });
    }
  };

  const removeAnswer = (newAnswer) => {
    if (answerPayload.answer.includes(newAnswer)) {
      setAnswerPayload((prev) => {
        return {
          ...prev,
          answer: [...prev.answer.filter((x) => x !== newAnswer)],
        };
      });
    }
  };

  const setResultId = (id) => {
    if (id && id !== answerPayload.id) {
      // console.log(id);
      setAnswerPayload((prev) => {
        return {
          ...prev,
          id: id,
        };
      });
    }
  };

  const resetAnswerPayload = () => {
    setAnswerPayload({ id: '', answer: [] });
  };

  const resetResult = () => {
    setResult({ score: 0, success: false });
  };

  async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code === 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          window.alert(`${error.message}:\n ${details}`);
        } else if (error.extensions.code === 'FORBIDDEN') {
          window.alert(error.message);
        } else {
          window.alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (err) {
      window.alert(`${err}`);
    }
    return undefined;
  }

  useEffect(() => {
    (async () => {
      if (!captchaId) return;
      const query = `query GetRecaptchaQuestion($getRecaptchaQuestionId: String!) {
          getRecaptchaQuestion(id: $getRecaptchaQuestionId) {
            img,height,width,question,id
          }
        }`;
      await graphQLFetch(query, { getRecaptchaQuestionId: captchaId })
        .catch((error) => {
          console.error(error);
        })
        .then((res) => {
          if (!res) return;
          if (res.getRecaptchaQuestion) {
            setData({
              ...res.getRecaptchaQuestion,
              img: `data:image/jpeg;base64, ${res.getRecaptchaQuestion.img}`,
            });
            // console.log(res.data);
          }
        });
    })();
  }, [captchaId]);

  const { answer, id } = answerPayload;

  useEffect(() => {
    if (!id) return;
    (async () => {
      const query = `query Query($validateRecaptchaAnswerId: String!, $answer: [String]!) {
          validateRecaptchaAnswer(id: $validateRecaptchaAnswerId, answer: $answer)
        }`;
      await graphQLFetch(query, {
        validateRecaptchaAnswerId: `${id}`,
        answer: answer.map((index) => `${index}`),
      })
        .catch((error) => {
          console.error(error);
        })
        .then((res) => {
          if (!res) return;
          if (res.validateRecaptchaAnswer) {
            console.log(res.validateRecaptchaAnswer);
            setResult({ score: res.validateRecaptchaAnswer, success: true });
            resetAnswerPayload();
          }
        });
    })();
  }, [id, result]);

  return (
    <ReCaptchaContext.Provider
      value={{
        data,
        answer,
        result,
        addAnswer,
        removeAnswer,
        showQuestion,
        setShowQuestion,
        setCaptchaId,
        setResultId,
        resetAnswerPayload,
        resetResult,
        captchaId,
      }}
    >
      {children}
    </ReCaptchaContext.Provider>
  );
};

export const useReCaptcha = () => useContext(ReCaptchaContext);
