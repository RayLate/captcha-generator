import useQueryAPI from './hook/useQueryAPI';
import React, { useEffect } from 'react';
import RForm from './components/ReCAPTCHA/RForm';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import RecaptchaForm from './components/ReCAPTCHA/RecaptchaForm';

const APITest = ({ data }) => {
  return (
    <div>
      <h1>Question: {data.question}</h1>
      <p>Result ID: {data.resultId}</p>
      <p>Img URL: {data.img}</p>
      <img src={`http://165.22.253.200:9000${data.img}`} alt='' />
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
          <Route path='/api-test/' element={<APITest data={data} />} />
          <Route path='/recaptcha' element={<RecaptchaForm data={data} />} />
          <Route path='/hcaptcha' element={<>hcaptcha</>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
