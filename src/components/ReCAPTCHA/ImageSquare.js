import React from 'react';

const ImageSquare = ({
  src,
  i,
  length,
  width,
  x,
  y,
  answer,
  addAnswer,
  removeAnswer,
}) => {
  const isSelected = answer.includes(i + 1);
  return (
    <>
      <div className='rc-image-tile-target'>
        <div
          className='rc-image-tile-wrapper'
          style={{
            width: 100,
            height: 100,
            overflow: 'hidden',
            transform: isSelected ? 'scale(0.8)' : null,
          }}
        >
          <img
            className='rc-image-tile-33'
            data-section={i + 1}
            src={src}
            width={width * 100}
            height={length * 100}
            style={{ objectFit: 'contain', top: `-${y}00%`, left: `-${x}00%` }}
            onClick={() => addAnswer(i + 1)}
            alt=''
          />
          <div className='rc-image-tile-overlay'></div>
        </div>
        <div
          className='rc-imageselect-checkbox'
          hidden={!isSelected}
          onClick={() => removeAnswer(i + 1)}
        ></div>
      </div>
    </>
  );
};

export default ImageSquare;
