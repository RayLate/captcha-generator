import { useHCaptcha } from '../../context/HcaptchaContext';
import AnswerDetail from '../template/AnswerDetail';

const HcaptchaAnswer = () => {
  const { result } = useHCaptcha();

  return (
    <>
      <AnswerDetail result={result} />
    </>
  );
};

export default HcaptchaAnswer;