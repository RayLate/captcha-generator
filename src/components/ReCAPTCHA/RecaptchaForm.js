import React from 'react';
import {
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import RecaptchaCheck from './RecaptchaCheck';

const RecaptchaForm = ({ data }) => {
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
          <RecaptchaCheck data={data} />
          <FormControl
            id='recaptcha-demo-submit'
            type='submit'
            value='Submit'
          ></FormControl>
        </fieldset>
      </Form>
    </>
  );
};

export default RecaptchaForm;
