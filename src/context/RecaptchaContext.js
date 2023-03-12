import React, { createContext, useContext, useEffect, useState } from 'react';
import { graphQLFetch } from './api';
const ReCaptchaContext = createContext({
  data: { id: '', img: '', question: '', height: 1, width: 1 },
  captchaId: '',
  setCaptchaId: () => {},
  setResultId: () => {},
  showQuestion: false,
  setShowQuestion: () => {},
  answer: [],
  setAnswer: () => {},
  result: { score: 0, success: false },
  resetContextVariables: () => {},
});

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
