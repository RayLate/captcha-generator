import React from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useHCaptcha } from '../../context/HcaptchaContext';
import QuestionNavigator from '../template/QuestionNavigator';
import HcaptchaCheck from './HcaptchaCheck';

const HcaptchaForm = () => {
  const { hcaptchaId, setCaptchaId, resetContextVariables } = useHCaptcha();
  return (
    <>
      <Form className='p-4 m-4 border' style={{ width: 350 }}>
        <fieldset>
          <legend>Sample Form with hCAPTCHA</legend>
          <FormGroup className='mb-3'>
            <FormLabel>Form Field (Optional)</FormLabel>
            <FormControl className='textinput' type='text'></FormControl>
          </FormGroup>
          <HcaptchaCheck />
          <QuestionNavigator
            resetContext={resetContextVariables}
            setCaptchaId={setCaptchaId}
            captchaId={hcaptchaId}
          />
        </fieldset>
      </Form>
    </>
  );
};

export default HcaptchaForm;
