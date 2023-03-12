import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSlider } from '../../context/SliderContext';
import { ArrowRightShort } from 'react-bootstrap-icons';

import './styles.css';
const SliderForm = () => {
  const { data } = useSlider();
  const [position, setPosition] = useState({ initX: 0, initY: 0, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    function handleMouseDown() {
      if (dragging) {
        document.body.style.userSelect = 'none';
      }
    }

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const handleMouseUp = (event) => {
      setDragging(false);
      document.body.style.userSelect = 'all';
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (event) => {
    setDragging(true);
    setPosition((prev) => ({
      ...prev,
      initX: event.clientX,
      initY: event.clientY,
    }));
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      document.body.style.userSelect = 'none';
      setPosition((prev) => ({
        ...prev,
        x: Math.min(Math.max(0, event.clientX - prev.initX), 220),
        y: event.clientY - prev.initY,
      }));
    }
  };

  return (
    <>
      <Card
        className='m-5 shadow text-center'
        style={{ width: 340 }}
        onMouseMove={handleMouseMove}
      >
        <Card.Header
          className='bg-primary'
          style={{ paddingTop: 3, paddingBottom: 3 }}
        ></Card.Header>
        <Card.Body>
          <Card.Text>Slide to complete the puzzle</Card.Text>
          <div
            className='mb-2'
            style={{ position: 'relative', width: 300, height: 200 }}
          >
            <img
              src={data.background_src}
              alt=''
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                width: '100%',
              }}
            />
            <img
              src={data.slice_src}
              alt=''
              style={{
                width: data.slice_css_attributes.width,
                height: data.slice_css_attributes.height,
                position: 'absolute',
                left: 0,
                top: +data.slice_css_attributes.top.replace('px', ''),
                transform: `translateX(${position.x}px)`,
              }}
            />
          </div>
          <div
            className='geetest_slider'
            style={{
              position: 'relative',
              paddingBottom: 60,
            }}
          >
            <div
              className='geetest_track'
              style={{
                position: 'absolute',
                top: 22,
                width: 300,
                backgroundColor: '#DEE3EB',
                borderRadius: 10,
                boxShadow: 'inset 0 0 4px rgba(0,0,0,.1)',
                paddingBottom: 18,
              }}
            >
              <div
                className='geetest_btn'
                style={{
                  zIndex: 99999,
                  position: 'absolute',
                  top: '-90%',
                  width: '26.83%',
                  paddingBottom: '16.77%',
                  borderRadius: 36,
                  cursor: 'pointer',
                  transform: `translateX(${position.x}px)`,
                }}
                draggable={false}
                onMouseDown={handleMouseDown}
              >
                <ArrowRightShort
                  className='p-0 m-0'
                  color='white'
                  size={40}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '25%',
                  }}
                />
              </div>
            </div>
          </div>
          <Card.Text>
            Question _id: {data._id}
            <br />
            Question Result:{' '}
            <span className={data.result ? 'text-success' : 'text-danger'}>
              {data.result ?? 'not set yet'}
            </span>
          </Card.Text>
          <Card.Text>TranslateX Postion: {position.x}</Card.Text>
          <Button variant='primary'>Save Answer</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default SliderForm;
