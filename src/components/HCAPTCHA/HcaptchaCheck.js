import React, { useState } from 'react';
import { useHCaptcha } from '../../context/HcaptchaContext';
import CheckBox from '../template/CheckBox';
import HcaptchaQuestion from './HcaptchaQuestion';
import './styles.css';

const HcaptchaCheck = () => {
  const [questionPos, setQuestionPos] = useState({ top: 0, left: 0 });
  const [showQuestion, setShowQuestion] = useState(false);
  const { resetContextVariables } = useHCaptcha();

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
        containterClassName='h-captcha'
        checkBoxId={'checkbox'}
        checkBoxClassName={'hcaptcha-checkbox'}
        checkBoxOnClickHandler={checkBoxOnClickHandler}
        logoSrc={'https://cdn.worldvectorlogo.com/logos/hcaptcha-2.svg'}
        checkBoxLabel={'I am human'}
        captchaTypeLabel={'hCAPTCHA'}
      />
      <HcaptchaQuestion
        questionPos={questionPos}
        showQuestion={showQuestion}
        setShowQuestion={setShowQuestion}
      />
    </>
  );
};

export default HcaptchaCheck;
