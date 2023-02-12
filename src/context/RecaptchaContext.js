import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ReCaptchaContext = createContext({
  data: { resultid: '', img: '', question: '', length: 0, width: 0 },
  captchaId: 1,
  setCaptchaId: () => {},
  setResultId: () => {},
  answerPayload: { resultId: '', answer: [] },
  resetAnswerPayload: () => {},
  addAnswer: () => {},
  removeAnswer: () => {},
  showQuestion: false,
  setShowQuestion: () => {},
  result: { score: 0, success: false },
  loading: false,
  resetResult: () => {},
});

export const ReCaptchaProvider = ({ children }) => {
  const [data, setData] = useState({
    resultid: '',
    img: '',
    question: 'title # keyword # instruction',
    length: 1,
    width: 1,
  });
  const [answerPayload, setAnswerPayload] = useState({
    resultId: '',
    answer: [],
  });
  const [result, setResult] = useState({ score: 0, success: false });
  const [showQuestion, setShowQuestion] = useState(false);
  const [captchaId, setCaptchaId] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const setResultId = (resultId) => {
    if (resultId && resultId !== answerPayload.resultId) {
      // console.log(resultId);
      setAnswerPayload((prev) => {
        return {
          ...prev,
          resultId: resultId,
        };
      });
    }
  };

  const resetAnswerPayload = () => {
    setAnswerPayload({ resultId: '', answer: [] });
  };

  const resetResult = () => {
    setResult({ score: 0, success: false });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!captchaId) return;
      await axios
        .post('http://165.22.253.200:9000/api/recaptcha/random', null, {
          params: { captchaId },
        })
        .catch((error) => {
          console.error(error);
        })
        .then((res) => {
          if (!res) return;
          if (res.data) {
            setData(res.data);
            // console.log(res.data);
          }
        })
        .then(() => {
          setLoading(false);
        });
    })();
  }, [captchaId]);

  const { answer, resultId } = answerPayload;

  useEffect(() => {
    if (!answer || !resultId) return;
    (async () => {
      console.log(answerPayload);
      setLoading(true);
      await axios
        .post('http://165.22.253.200:9000/api/recaptcha/check', null, {
          params: { answer: answer, resultId: resultId },
        })
        .catch((error) => {
          console.error(error);
        })
        .then((res) => {
          if (!res) return;
          if (res.data) {
            // console.log(res.data);
            setResult(res.data);
            resetAnswerPayload();
          }
        })
        .then(() => {
          setLoading(false);
        });
    })();
  }, [result, resultId]);

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
        loading,
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
