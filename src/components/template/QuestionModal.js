const QuestionModal = ({
  showQuestion,
  setShowQuestion,
  resetContext,
  children,
}) => {
  return (
    <div hidden={!showQuestion}>
      <div
        className='mask rc-backdrop'
        onClick={() => {
          resetContext();
          setShowQuestion(false);
        }}
      ></div>
      {children}
    </div>
  );
};

export default QuestionModal;
