import React from 'react';
import ImageSquare from './ImageSquare';

const RecaptchaQuestion = ({ showQuestion, data }) => {
  const question = data.question ? (
    data.question.split('#').map((text, i) => {
      const headStyle = {
        fontSize: 12,
        padding: 0,
        margin: 0,
      };
      const midStyle = {
        fontSize: 28,
        fontWeight: 'bold',
        display: 'block',
      };
      const tailStyle = {
        fontSize: 14,
      };
      const className = ['qs-title', 'qs-keyword', 'qs-instruction'];
      return (
        <span
          key={text}
          className={className[i]}
          style={i === 1 ? midStyle : i === 2 ? tailStyle : headStyle}
        >
          {text}
        </span>
      );
    })
  ) : (
    <></>
  );

  const { length, width } = data;

  const numberOfBox = length * width || 9;

  return (
    <div
      className='border bg-white p-2'
      style={{
        position: 'absolute',
        left: 50,
        top: 50,
      }}
      hidden={showQuestion}
    >
      <div className='bg-primary text-white p-4 mb-2'>{question}</div>
      <div
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
            src={`http://165.22.253.200:9000${data.img}`}
            i={i}
            length={length || 3}
            width={width || 3}
            x={i % width}
            y={Math.floor(i / width)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecaptchaQuestion;
