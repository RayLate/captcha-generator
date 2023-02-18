import React from 'react';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

const HcaptchaForm = () => {
  return (
    <>
      <Form className='p-4 m-4 border' style={{ width: 350 }}>
        <fieldset>
          <legend>Sample Form with hCAPTCHA</legend>
          <FormGroup className='mb-3'>
            <FormLabel>Form Field (Optional)</FormLabel>
            <FormControl className='textinput' type='text'></FormControl>
          </FormGroup>
        </fieldset>
      </Form>
    </>
  );
};

export default HcaptchaForm;
