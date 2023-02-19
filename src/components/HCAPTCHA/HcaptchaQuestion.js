import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useHCaptcha } from '../../context/HcaptchaContext';
import QuestionModal from '../template/QuestionModal';

const HcaptchaQuestion = ({ questionPos, showQuestion, setShowQuestion }) => {
  const { data, setAnswer, resetContextVariables } = useHCaptcha();
  const [selected, setSelected] = useState([]);

  const filteredKeys = Object.keys(data).filter((key) => key.startsWith('img'));
  const images = filteredKeys.map((key) => {
    return { id: key[key.length - 1], img: data[key] };
  });

  const answerImageKey = filteredKeys.find((key) =>
    data.answer.includes((+key[key.length - 1] - 1).toString())
  );
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
      {!data.question ? (
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
              zIndex: 1000,
              left: questionPos.left + 50,
              top: questionPos.top - 200,
              width: data.width * 122 + 2 * 10 + 16,
            }}
          >
            <div className='p-2 challenge-container'>
              <div className='prompt-bg mb-2'>
                <div
                  className='examples p-2'
                  style={{
                    display: 'flex',
                    width: 380,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div className='prompt-text ' style={{ width: 250 }}>
                    <span>{data.question}</span>
                    <p className='skip'>If there are None, click Skip</p>
                  </div>
                  <div className='image ' style={{ height: 90, width: 90 }}>
                    {answerImageKey ? (
                      <Image
                        src={`data:image/jpeg;base64, ${data[answerImageKey]}`}
                        fluid={true}
                        alt='hint'
                      />
                    ) : undefined}
                  </div>
                </div>
              </div>
              <div
                className='task-grid '
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 4,
                  flexWrap: 'wrap',
                }}
              >
                {images.map((image) => (
                  <div
                    className='task-image'
                    role='button'
                    aria-pressed={selected.includes(image.id)}
                    key={image.id}
                    onClick={() => imageOnClickHandler(image.id)}
                  >
                    <div
                      className='task-image-border'
                      style={{
                        border: `4px solid rgb(0, 131, 143, ${
                          selected.includes(image.id) ? 1 : 0
                        })`,
                        width: 125,
                        height: 125,
                      }}
                    >
                      <Image
                        src={`data:image/jpeg;base64, ${image.img}`}
                        alt=''
                        fluid={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='challenge-interface p-2'>
              <div
                className='button-submit'
                aria-label='Submit Answers'
                role='button'
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    selected.length === 0
                      ? 'rgb(85,85,85)'
                      : 'rgb(0, 131, 143)',
                  borderRadius: 4,
                  minWidth: '70px',
                  height: '35px',
                }}
                onClick={() => {
                  setAnswer([...selected.map((i) => `${parseInt(i) + 1}`)]);
                  setSelected([]);
                  setShowQuestion(false);
                }}
              >
                <div
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '35px',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {selected.length === 0 ? 'Skip' : 'Verify'}
                </div>
              </div>
            </div>
          </div>
        </QuestionModal>
      )}
    </>
  );
};

export default HcaptchaQuestion;
