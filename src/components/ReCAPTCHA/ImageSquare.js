import React from 'react';

const ImageSquare = ({ src, i, length, width, x, y }) => {
  return (
    <>
      <div className='rc-image-tile-target'>
        <div
          className='rc-image-tile-wrapper'
          style={{ width: 100, height: 100, overflow: 'hidden' }}
        >
          <img
            src={src}
            // className='m-1'
            data-section={i}
            width={width * 100}
            height={length * 100}
            style={{ objectFit: 'contain', top: `-${y}00%`, left: `-${x}00%` }}
          />
          <div className='rc-image-tile-overlay'></div>
        </div>
        <div className='rc-imageselect-checkbox'></div>
      </div>
    </>
  );
};

export default ImageSquare;
