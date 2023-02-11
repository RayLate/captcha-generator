import React, { useState } from 'react';
import {  Container, Image } from 'react-bootstrap';
import RecaptchaQuestion from './RecaptchaQuestion';
import './styles.css';

const RecaptchaCheck = ({ data }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  return (
    <>
      <Container
        className='border mb-3 bg-light shadow-sm rounded recaptcha-container'
        style={{
          width: 300,
          height: 75,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 12,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              className='recaptcha-checkbox goog-inline-block recaptcha-checkbox-unchecked rc-anchor-checkbox'
              style={{
                height: 32,
                width: 32,
              }}
              onClick={() => setShowQuestion(!showQuestion)}
            ></div>
            <span className='px-3' style={{ lineHeight: 2 }}>
              I'm not a robot!
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
            }}
          >
            <Image
              src={'https://www.gstatic.com/recaptcha/api2/logo_48.png'}
              height={32}
              width={32}
            />
            <span className='reCAPTCHA-text'>reCAPTCHA</span>
          </div>
        </div>
      </Container>
      <RecaptchaQuestion showQuestion={showQuestion} data={data} />
    </>
  );
};

export default RecaptchaCheck;
