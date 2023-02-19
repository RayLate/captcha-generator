import React, { useState } from 'react';
import RecaptchaQuestion from './RecaptchaQuestion';
import './styles.css';
import { useReCaptcha } from '../../context/RecaptchaContext';
import CheckBox from '../template/CheckBox';

const RecaptchaCheck = () => {
  const [questionPos, setQuestionPos] = useState({ top: 0, left: 0 });
  const { showQuestion, setShowQuestion, resetContextVariables } =
    useReCaptcha();

  function checkBoxOnClickHandler(top, left) {
    setQuestionPos({
      top: top,
      left: left,
    });
    resetContextVariables();
    setShowQuestion(!showQuestion);
  }

  return (
    <>
      <CheckBox
        containerClassName={'recaptcha-container'}
        checkBoxClassName={
          'recaptcha-checkbox goog-inline-block recaptcha-checkbox-unchecked rc-anchor-checkbox'
        }
        checkBoxOnClickHandler={checkBoxOnClickHandler}
        logoSrc={'https://www.gstatic.com/recaptcha/api2/logo_48.png'}
        checkBoxLabel={"I'm not a robot!"}
        captchaTypeLabel={'reCAPTCHA'}
      />
      <RecaptchaQuestion
        questionPos={questionPos}
        showQuestion={showQuestion}
        setShowQuestion={setShowQuestion}
      />
    </>
  );
};

export default RecaptchaCheck;
