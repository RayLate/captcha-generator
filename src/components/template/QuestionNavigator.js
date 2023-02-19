import { Button } from 'react-bootstrap';

const QuestionNavigator = ({ resetContext, setCaptchaId, captchaId }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        id='previous-question'
        type='submit'
        className='px-3 previous-question-button'
        style={{
          borderRadius: 2,
          textTransform: 'uppercase',
        }}
        onClick={(e) => {
          e.preventDefault();
          resetContext();
          setCaptchaId(Math.max(0, +captchaId - 1).toString());
        }}
      >
        prev
      </Button>
      <div id='question-number' className='text-primary'>
        {captchaId ? `Q${captchaId}` : null}
      </div>
      <Button
        id='next-question'
        type='submit'
        className='px-3 next-question-button'
        style={{
          borderRadius: 2,
          textTransform: 'uppercase',
        }}
        onClick={(e) => {
          e.preventDefault();
          resetContext();
          setCaptchaId(Math.min(1000, +captchaId + 1).toString());
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default QuestionNavigator;
