import React from 'react';
// import './Opener.css';

const Opener = () => {
  return (
    <>
      <div id='rc-anchor-alert' className='rc-anchor-alert'></div>
      <div
        id='rc-anchor-container'
        className='rc-anchor rc-anchor-normal rc-anchor-light'
      >
        <div className='rc-anchor-content'>
          <div className='rc-inline-block'>
            <div className='rc-anchor-center-container'>
              <div className='rc-anchor-center-item rc-anchor-checkbox-holder'>
                <span
                  className='recaptcha-checkbox goog-inline-block recaptcha-checkbox-unchecked rc-anchor-checkbox'
                  role='checkbox'
                  aria-checked='false'
                  id='recaptcha-anchor'
                  dir='ltr'
                  aria-labelledby='recaptcha-anchor-label'
                  aria-disabled='false'
                  tabIndex='0'
                >
                  <div
                    className='recaptcha-checkbox-border'
                    role='presentation'
                  ></div>
                  <div
                    className='recaptcha-checkbox-borderAnimation'
                    role='presentation'
                  ></div>
                  <div
                    className='recaptcha-checkbox-spinner'
                    role='presentation'
                    // style='display: none; animation-play-state: running; opacity: 0; transform: scale(0);'
                  >
                    <div
                      className='recaptcha-checkbox-spinner-overlay'
                      //   style='animation-play-state: running;'
                    ></div>
                  </div>
                  <div
                    className='recaptcha-checkbox-checkmark'
                    role='presentation'
                  ></div>
                </span>
              </div>
            </div>
          </div>
          <div className='rc-inline-block'>
            <div className='rc-anchor-center-container'>
              <label
                className='rc-anchor-center-item rc-anchor-checkbox-label'
                aria-hidden='true'
                role='presentation'
                id='recaptcha-anchor-label'
              >
                <span
                  aria-live='polite'
                  aria-labelledby='recaptcha-accessible-status'
                ></span>
                I'm not a robot
              </label>
            </div>
          </div>
        </div>
        <div className='rc-anchor-normal-footer'>
          <div
            className='rc-anchor-logo-portrait'
            aria-hidden='true'
            role='presentation'
          >
            <div className='rc-anchor-logo-img rc-anchor-logo-img-portrait'></div>
            <div className='rc-anchor-logo-text'>reCAPTCHA</div>
          </div>
          <div
            class='rc-anchor-pt'
            style={{ position: 'relative', left: -190 }}
          >
            <a
              href='https://www.google.com/intl/en/policies/privacy/'
              target='_blank'
              style={{
                fontSize: '8px',
                fontWeight: 400,
                verticalAlign: 'top',
                fontFamily: 'Roboto, helvetica, arial, sans-serif !important',
              }}
            >
              Privacy
            </a>
            <span
              aria-hidden='true'
              role='presentation'
              style={{
                fontSize: '8px',
                fontWeight: 400,
                verticalAlign: 'top',
                fontFamily: 'Roboto, helvetica, arial, sans-serif !important',
              }}
            >
              {' '}
              -{' '}
            </span>
            <a
              href='https://www.google.com/intl/en/policies/terms/'
              target='_blank'
              style={{
                fontSize: '8px',
                fontWeight: 400,
                verticalAlign: 'top',
                fontFamily: 'Roboto, helvetica, arial, sans-serif !important',
              }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Opener;
