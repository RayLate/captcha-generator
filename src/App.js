import useQueryAPI from './hook/useQueryAPI';
import React, { useEffect } from 'react';
// import RForm from './components/ReCAPTCHA/RForm';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import RecaptchaForm from './components/ReCAPTCHA/RecaptchaForm';
import { ReCaptchaProvider, useReCaptcha } from './context/RecaptchaContext';

const APITest = () => {
  const { data, setCaptchaId } = useReCaptcha();
  const { width, length } = data;
  console.log(width, length);
  return (
    <div className='p-5'>
      <h1>Question: {data.question}</h1>
      <p>Result ID: {data.resultId}</p>
      <p>Img URL: {data.img}</p>
      <img src={`http://165.22.253.200:9000${data.img}`} alt='' />
      <br></br>
      <button
        type='button'
        onClick={() => setCaptchaId(Math.floor(Math.random() * 100) + 1)}
      >
        Next Question
      </button>
      {/* <RForm /> */}
    </div>
  );
};
const Home = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/api-test'>API Test</Link>
          </li>
          <li>
            <Link to='/recaptcha'>Recaptcha</Link>
          </li>
          <li>
            <Link to='/hcaptcha'>Hcaptcha</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

function App() {
  const { data } = useQueryAPI(
    'http://165.22.253.200:9000/api/recaptcha/random',
    1
  );

  return (
    <div className='font-roboto'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route
            path='/api-test/'
            element={
              <ReCaptchaProvider>
                <APITest />
              </ReCaptchaProvider>
            }
          />
          <Route
            path='/recaptcha'
            element={
              <ReCaptchaProvider>
                <RecaptchaForm data={data} />
              </ReCaptchaProvider>
            }
          />
          <Route path='/hcaptcha' element={<>hcaptcha</>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
