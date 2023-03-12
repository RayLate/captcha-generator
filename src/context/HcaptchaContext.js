import React, { createContext, useContext, useEffect, useState } from 'react';
import { graphQLFetch } from './api';
const HCaptchaContext = createContext({
  data: {
    id: 0,
    img0: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    img6: '',
    img7: '',
    img8: '',
    height: '',
    width: '',
    question: '',
    answer: [],
  },
  hcaptchaId: '',
  setCaptchaId: () => {},
  showQuestion: false,
  setShowQuestion: () => {},
  answer: [],
  setAnswer: () => {},
  result: { success: false, score: 0 },
  resetContextVariables: () => {},
});

export const HCaptchaProvider = ({ children }) => {
  const [data, setData] = useState({
    id: 0,
    img0: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    img6: '',
    img7: '',
    img8: '',
    height: '',
    width: '',
    question: '',
    answer: [],
  });
  const [hcaptchaId, setCaptchaId] = useState('0');
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState(undefined);
  const [result, setResult] = useState({ success: false, score: 0 });

  function resetContextVariables() {
    setAnswer(undefined);
    setResult({ success: false, score: 0 });
  }

  useEffect(() => {
    (async () => {
      if (!hcaptchaId) return;
      const query = `
        query GetHcaptchaQuestion($getHcaptchaQuestionId: String!) {
                getHcaptchaQuestion(id: $getHcaptchaQuestionId) {
                    img0
                    img1
                    img2
                    img3
                    img4
                    img5
                    img6
                    img7
                    img8
                    question
                    width
                    height
                    id
                    answer
                }
            }
        `;
      await graphQLFetch(query, { getHcaptchaQuestionId: hcaptchaId })
        .catch((err) => console.log(err))
        .then((res) => {
          if (!res) return;
          if (res.getHcaptchaQuestion) {
            setData({ ...res.getHcaptchaQuestion });
          }
        });
    })();
  }, [hcaptchaId]);

  useEffect(() => {
    (async () => {
      if (!hcaptchaId || answer === undefined) return;

      const query = `
          query Query($validateHcaptchaAnswerId: String!, $answer: [String]!) {
            validateHcaptchaAnswer(id: $validateHcaptchaAnswerId, answer: $answer)
          }
        `;
      await graphQLFetch(query, {
        validateHcaptchaAnswerId: hcaptchaId,
        answer: answer,
      })
        .catch((err) => console.log(err))
        .then((res) => {
          if (!res) return;
          if (res.validateHcaptchaAnswer || res.validateHcaptchaAnswer === 0) {
            setResult({ success: true, score: res.validateHcaptchaAnswer });
            setAnswer(undefined);
          }
        });
    })();
  }, [hcaptchaId, answer]);

  return (
    <HCaptchaContext.Provider
      value={{
        data,
        answer,
        result,
        hcaptchaId,
        setCaptchaId,
        showQuestion,
        setShowQuestion,
        setAnswer,
        resetContextVariables,
      }}
    >
      {children}
    </HCaptchaContext.Provider>
  );
};

export const useHCaptcha = () => useContext(HCaptchaContext);
