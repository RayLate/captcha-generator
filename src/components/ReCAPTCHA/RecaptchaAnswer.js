import { useReCaptcha } from '../../context/RecaptchaContext';
import AnswerDetail from '../template/AnswerDetail';

const RecaptchaAnswer = () => {
  const { result } = useReCaptcha();

  return (
    <>
      <AnswerDetail result={result} />
    </>
  );
};

export default RecaptchaAnswer;
