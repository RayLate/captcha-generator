import React from 'react';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import RecaptchaCheck from './RecaptchaCheck';
import { useReCaptcha } from '../../context/RecaptchaContext';

const RecaptchaForm = () => {
  const { setCaptchaId, resetAnswerPayload, result, captchaId } =
    useReCaptcha();
  return (
    <>
      <Form className='p-4 m-4 border' style={{ width: 350 }}>
        <fieldset>
          <legend>Sample Form with ReCAPTCHA</legend>
          <FormGroup className='mb-3'>
            <FormLabel>First Name</FormLabel>
            <FormControl type='text' value='Jane' disabled></FormControl>
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormLabel htmlFor='input1'>First Name</FormLabel>
            <FormControl
              id='input1'
              name='input1'
              type='text'
              value='Jane'
              disabled
            />
            <FormGroup className='mb-3'></FormGroup>

            <FormLabel htmlFor='input2'>Last Name</FormLabel>
            <FormControl
              id='input2'
              name='input2'
              type='text'
              value='Smith'
              disabled
            />
            <FormGroup className='mb-3'></FormGroup>

            <FormLabel htmlFor='input3'>Email</FormLabel>
            <FormControl
              id='input3'
              name='input3'
              type='text'
              value='stopallbots@gmail.com'
              disabled
            />
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormLabel>Pick your favorite color:</FormLabel>
            <FormCheck type={'radio'} label='Red' disabled checked />
            <FormCheck type={'radio'} label='Green' disabled />
          </FormGroup>
          <FormGroup className='mb-3'></FormGroup>
          <RecaptchaCheck />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              id='recaptcha-demo-previous-question'
              type='submit'
              className='px-3 previous-question-button'
              style={{
                borderRadius: 2,
                textTransform: 'uppercase',
              }}
              onClick={(e) => {
                e.preventDefault();
                resetAnswerPayload();
                setCaptchaId(Math.max(1, +captchaId - 1).toString());
              }}
            >
              prev
            </Button>
            <div id='question-number' className='text-primary'>
              {captchaId ? `Q${captchaId}` : null}
            </div>
            <Button
              id='recaptcha-demo-next-question'
              type='submit'
              className='px-3 next-question-button'
              style={{
                borderRadius: 2,
                textTransform: 'uppercase',
              }}
              onClick={(e) => {
                e.preventDefault();
                resetAnswerPayload();
                setCaptchaId(Math.max(1, +captchaId + 1).toString());
              }}
            >
              Next
            </Button>
          </div>
        </fieldset>
      </Form>
      {result.success ? (
        <div className='score m-4'>
          <h1
            style={{ color: result.score < 0.8 ? 'red' : 'green' }}
          >{`Jaccard Index: ${result.score.toFixed(2)}`}</h1>
        </div>
      ) : null}
    </>
  );
};

export default RecaptchaForm;
