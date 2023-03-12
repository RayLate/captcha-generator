import React, { createContext, useContext, useEffect, useState } from 'react';
import { graphQLFetch } from './api';

const SliderContext = createContext({
  data: {
    _id: '',
    id: 0,
    slice_css_attributes: {
      width: '',
      height: '',
      top: '',
    },
    background_src: '',
    slice_src: '',
    answer: 0,
  },
  sliderId: '',
  setSliderId: () => {},
  resetContextVariables: () => {},
  setTrueAnsPayload: () => {},
});

export const SliderCaptchaProvider = ({ children }) => {
  const [data, setData] = useState({
    _id: '',
    id: 0,
    slice_css_attributes: {
      width: '',
      height: '',
      top: '',
    },
    background_src: '',
    slice_src: '',
    answer: undefined,
  });
  const [sliderId, setSliderId] = useState('0');
  const [trueAnsPayload, setTrueAnsPayload] = useState({
    id: undefined,
    answer: undefined,
  });

  function resetContextVariables() {
    setTrueAnsPayload({ id: undefined, answer: undefined });
  }

  useEffect(() => {
    (async () => {
      if (!sliderId) return;
      const query = `query GetSliderQuestion($getSliderQuestionId: String!) {
            getSliderQuestion(id: $getSliderQuestionId) {
                _id
                id
                slice_css_attributes {
                width
                height
                top
                }
                background_src
                slice_src
                answer
            }
        }`;
      await graphQLFetch(query, { getSliderQuestionId: sliderId })
        .catch((error) => console.error(error))
        .then((res) => {
          if (!res) return;
          if (res.getSliderQuestion) {
            setData({
              ...res.getSliderQuestion,
              background_src: `data:image/jpeg;base64, ${res.getSliderQuestion.background_src}`,
              slice_src: `data:image/jpeg;base64, ${res.getSliderQuestion.slice_src}`,
            });
            console.log(res.getSliderQuestion);
          }
        });
    })();
  }, [sliderId]);

  useEffect(() => {
    (async () => {
      if (!trueAnsPayload.answer || !trueAnsPayload.id) return;
      const query = `mutation Mutation($id: String!, $answer: Int!) {
                updateSliderAnswer(id: $id, answer: $answer)
                }`;
      await graphQLFetch(query, {
        id: trueAnsPayload.id,
        answer: trueAnsPayload.answer,
      })
        .catch((error) => console.error(error))
        .then((res) => {
          if (!res) return;
          if (res.updateSliderAnswer) {
            setData((prev) => ({ ...prev, answer: trueAnsPayload.answer }));
            console.log(trueAnsPayload.id, 'Updated Successfully');
          }
        });
    })();
  }, [trueAnsPayload]);

  return (
    <SliderContext.Provider
      value={{
        data,
        sliderId,
        setSliderId,
        resetContextVariables,
        setTrueAnsPayload,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => useContext(SliderContext);
