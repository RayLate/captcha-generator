import React from 'react';
import { Button } from 'react-bootstrap';
import ImageSquare from './ImageSquare';
import { useReCaptcha } from '../../context/RecaptchaContext';

const RecaptchaQuestion = ({ questionPos }) => {
  const {
    showQuestion,
    data,
    loading,
    setShowQuestion,
    setResultId,
    answer,
    addAnswer,
    removeAnswer,
    resetAnswerPayload,
  } = useReCaptcha();

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

  const { length, width, resultId } = data;

  const numberOfBox = length * width || 9;

  const submitResult = () => {
    setResultId(resultId);

    setShowQuestion(false);
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div>
          <div
            className='mask rc-backdrop'
            hidden={!showQuestion}
            onClick={() => {
              resetAnswerPayload();
              setShowQuestion(false);
            }}
          ></div>
          <div
            className='border bg-white'
            style={{
              position: 'absolute',
              left: questionPos.left + 50,
              top: questionPos.top - 400,
              zIndex: 1000,
            }}
            hidden={!showQuestion}
          >
            <div id='iframe-main' className='p-2 '>
              <div className='bg-primary text-white p-3 mb-2 rc-imageselect-instructions'>
                {question}
              </div>
              <div
                className=''
                style={{
                  width: width * 100 + width * 2,
                  height: length * 100 + length * 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                {[...Array(numberOfBox).keys()].map((i) => (
                  <ImageSquare
                    key={i}
                    src={data.img ? `https://165.22.253.200${data.img}` : null}
                    i={i}
                    length={length || 3}
                    width={width || 3}
                    x={i % width}
                    y={Math.floor(i / width)}
                    answer={answer}
                    addAnswer={addAnswer}
                    removeAnswer={removeAnswer}
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
                    onClick={submitResult}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecaptchaQuestion;
