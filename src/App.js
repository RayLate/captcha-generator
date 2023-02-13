import React, { useState, useEffect } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import RecaptchaForm from './components/ReCAPTCHA/RecaptchaForm';
import { ReCaptchaProvider, useReCaptcha } from './context/RecaptchaContext';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

const NavLink = ({ to, children }) => (
  <Nav.Item>
    <Nav.Link as={RouterLink} to={to}>
      {children}
    </Nav.Link>
  </Nav.Item>
);

const APITest = () => {
  const { data, setCaptchaId } = useReCaptcha();
  return (
    <div className='p-5'>
      <h1>Question: {data.question}</h1>
      <p>Result ID: {data.resultId}</p>
      <p>Img URL: {data.img}</p>
      <img
        src={data.img ? `http://165.22.253.200:9000${data.img}` : null}
        alt=''
      />
      <br></br>
      {/* <button
        type='button'
        onClick={() => setCaptchaId(Math.floor(Math.random() * 100) + 1)}
      >
        Random Question
      </button> */}
    </div>
  );
};
const Home = () => {
  return (
    <>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Nav className='me-auto'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/api-test'>API Test</NavLink>
            <NavLink to='/recaptcha'>Recaptcha</NavLink>
            <NavLink to='/hcaptcha'>Hcaptcha</NavLink>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

function App() {
  const [error, setError] = useState(null);

  useEffect(() => {
    window.onerror = (errorMessage, source, line, column, errorObject) => {
      console.log(errorMessage, source, line, column, errorObject);
      setError(errorObject);
    };
  }, []);

  if (error) {
    return (
      <div>
        <h1>An error has occurred</h1>
        <p>{error.toString()}</p>
      </div>
    );
  }

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
                <RecaptchaForm />
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
