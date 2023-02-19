const AnswerDetail = ({ result }) => {
  return (
    <>
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

export default AnswerDetail;
