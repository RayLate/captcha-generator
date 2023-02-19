import React, { useRef } from 'react';
import { Container, Image } from 'react-bootstrap';
const CheckBox = ({
  containerClassName,
  checkBoxId,
  checkBoxClassName,
  checkBoxOnClickHandler,
  logoSrc,
  checkBoxLabel,
  captchaTypeLabel,
}) => {
  const ref = useRef(null);
  return (
    <>
      <Container
        className={
          'border mb-3 bg-light shadow-sm rounded ' + containerClassName
        }
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
              id={checkBoxId}
              className={checkBoxClassName}
              style={{
                height: 32,
                width: 32,
              }}
              ref={ref}
              onClick={() =>
                checkBoxOnClickHandler(
                  ref.current.offsetTop,
                  ref.current.offsetLeft
                )
              }
            ></div>
            <span className='px-3' style={{ lineHeight: 2 }}>
              {checkBoxLabel}
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
            <Image src={logoSrc} height={32} width={32} />
            <span className={`${captchaTypeLabel}-text`}>
              {captchaTypeLabel}
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CheckBox;
