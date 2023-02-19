import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ImageSquare from './ImageSquare';
import { useReCaptcha } from '../../context/RecaptchaContext';
import QuestionModal from '../template/QuestionModal';

const RecaptchaQuestion = ({ questionPos, showQuestion, setShowQuestion }) => {
  const { data, setAnswer, resetContextVariables } = useReCaptcha();

  const [selected, setSelected] = useState([]);

  const question = data.question ? (
    data.question.split('#').map((text, i) => {
      const className = ['qs-title', 'qs-keyword', 'qs-instruction'];
      return (
        <span key={text} className={className[i]}>
          {text}
        </span>
      );
    })
  ) : (
    <></>
  );

  const { height, width } = data;

  const numberOfBox = height * width || 9;

  const imageOnClickHandler = (id) => {
    if (selected.includes(id)) {
      setSelected((prev) => {
        return [...prev.filter((x) => x !== id)];
      });
    } else {
      setSelected((prev) => {
        return [...prev, id];
      });
    }
  };

  return (
    <>
      {!data.img ? (
        <></>
      ) : (
        <QuestionModal
          showQuestion={showQuestion}
          setShowQuestion={setShowQuestion}
          resetContext={resetContextVariables}
        >
          <div
            className='border bg-white'
            style={{
              position: 'absolute',
              left: questionPos.left + 50,
              top: questionPos.top - 400,
              zIndex: 1000,
            }}
          >
            <div id='iframe-main' className='p-2 '>
              <div className='bg-primary text-white p-3 mb-2 rc-imageselect-instructions'>
                {question}
              </div>
              <div
                className=''
                style={{
                  width: width * 100 + width * 2,
                  height: height * 100 + height * 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                {[...Array(numberOfBox).keys()].map((i) => (
                  <ImageSquare
                    key={i}
                    src={data.img ? `${data.img}` : null}
                    i={i}
                    length={height || 3}
                    width={width || 3}
                    x={i % width}
                    y={Math.floor(i / width)}
                    selected={selected}
                    imageOnClickHandler={imageOnClickHandler}
                  />
                ))}
              </div>
            </div>
            <div className='p-2 rc-footer'>
              <div className='rc-separator'></div>
              <div className='rc-controls'>
                <div
                  className='verify-button-holder'
                  style={{ float: 'right' }}
                >
                  <Button
                    id='recaptcha-verify-button'
                    className='rc-button-default goog-inline-block px-4 py-2 my-2'
                    style={{ borderRadius: 2, textTransform: 'uppercase' }}
                    onClick={() => {
                      setAnswer([...selected.map((i) => `${i}`)]);
                      setSelected([]);
                      setShowQuestion(false);
                    }}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </QuestionModal>
      )}
    </>
  );
};

export default RecaptchaQuestion;
