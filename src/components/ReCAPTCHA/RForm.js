import React from 'react';
import Opener from './Opener';
import './RForm.css';

const RForm = () => {
  return (
    <div className='sample-form'>
      <form id='recaptcha-demo-form' method='POST'>
        <fieldset>
          <legend>Sample Form with ReCAPTCHA</legend>
          <ul>
            <li>
              <label htmlFor='input1'>First Name</label>
              <input
                onChange={() => {}}
                className='jfk-textinput'
                id='input1'
                name='input1'
                type='text'
                value='Jane'
                disabled={true}
                aria-disabled='true'
              />
            </li>
            <li>
              <label htmlFor='input2'>Last Name</label>
              <input
                onChange={() => {}}
                className='jfk-textinput'
                id='input2'
                name='input2'
                type='text'
                value='Smith'
                disabled={true}
                aria-disabled='true'
              />
            </li>
            <li>
              <label htmlFor='input3'>Email</label>
              <input
                onChange={() => {}}
                className='jfk-textinput'
                id='input3'
                name='input3'
                type='text'
                value='stopallbots@gmail.com'
                disabled={true}
                aria-disabled='true'
              />
            </li>
            <li>
              <p>Pick your favorite color:</p>
              <label className='jfk-radiobutton-label' htmlFor='option1'>
                <input
                  onChange={() => {}}
                  className='jfk-radiobutton-checked'
                  type='radio'
                  id='option1'
                  name='radios'
                  value='option1'
                  disabled={true}
                  aria-disabled='true'
                  checked=''
                  aria-checked='true'
                />
                Red
              </label>
              <label className='jfk-radiobutton-label' htmlFor='option2'>
                <input
                  onChange={() => {}}
                  className='jfk-radiobutton'
                  type='radio'
                  id='option2'
                  name='radios'
                  value='option2'
                  disabled={true}
                  aria-disabled='true'
                />
                Green
              </label>
            </li>
            <li>
              <Opener />
            </li>
            <li>
              <input id='recaptcha-demo-submit' type='submit' value='Submit' />
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  );
};

export default RForm;
