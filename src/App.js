import useQueryAPI from './hook/useQueryAPI';
import React, { useEffect } from 'react';
import RForm from './components/ReCAPTCHA/RForm';

function App() {
  const { data } = useQueryAPI(
    'http://165.22.253.200:9000/api/recaptcha/random',
    1
  );

  return (
    <div>
      <h1>Question: {data.question}</h1>
      <p>Result ID: {data.resultId}</p>
      <p>Img URL: {data.img}</p>
      <img src={`http://165.22.253.200:9000${data.img}`} alt='' />
      <RForm />
    </div>
  );
}

export default App;
