import React, { createContext, useContext, useEffect, useState } from 'react';

const ReCaptchaContext = createContext({
  data: { id: '', img: '', question: '', height: 1, width: 1 },
  captchaId: 1,
  setCaptchaId: () => {},
  setResultId: () => {},
  showQuestion: false,
  setShowQuestion: () => {},
  answer: [],
  setAnswer: () => {},
  result: { score: 0, success: false },
  resetContextVariables: () => {},
});

const APP_IP = 'http://localhost:5000/graphql';

export const ReCaptchaProvider = ({ children }) => {
  const [data, setData] = useState({
    id: '',
    img: '',
    question: 'title # keyword # instruction',
    height: 1,
    width: 1,
  });
  const [answer, setAnswer] = useState(undefined);
  const [result, setResult] = useState({ score: 0, success: false });
  const [showQuestion, setShowQuestion] = useState(false);
  const [captchaId, setCaptchaId] = useState('0');

  const resetContextVariables = () => {
    setAnswer(undefined);
    setResult({ success: false, score: 0 });
  };

  async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch(APP_IP, {
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
          }
        });
    })();
  }, [captchaId]);

  useEffect(() => {
    if (!captchaId || answer === undefined) return;
    (async () => {
      const query = `query Query($validateRecaptchaAnswerId: String!, $answer: [String]!) {
          validateRecaptchaAnswer(id: $validateRecaptchaAnswerId, answer: $answer)
        }`;
      await graphQLFetch(query, {
        validateRecaptchaAnswerId: `${captchaId}`,
        answer: answer,
      })
        .catch((error) => {
          console.error(error);
        })
        .then((res) => {
          if (!res) return;
          if (
            res.validateRecaptchaAnswer ||
            res.validateRecaptchaAnswer === 0
          ) {
            setResult({ score: res.validateRecaptchaAnswer, success: true });
            setAnswer(undefined);
          }
        });
    })();
  }, [captchaId, answer]);

  return (
    <ReCaptchaContext.Provider
      value={{
        data,
        answer,
        result,
        captchaId,
        setCaptchaId,
        showQuestion,
        setShowQuestion,
        setAnswer,
        resetContextVariables,
      }}
    >
      {children}
    </ReCaptchaContext.Provider>
  );
};

export const useReCaptcha = () => useContext(ReCaptchaContext);
