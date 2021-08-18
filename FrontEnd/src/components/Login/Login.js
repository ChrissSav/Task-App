import React, { useState, useEffect } from 'react';
import axiosApp from '../Util/axiosApp';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Statics from '../Util/Statics';
import cookie from 'react-cookies';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../actions/userLogin';

const Login = () => {
  const [email, setEmail] = useState('firstNadme@gmail.com');
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('firstName');
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookie.load(Statics.REFRESH_TOKEN);
    if (token) {
      window.location.href = '/';
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorText('');
    axiosApp
      .post('/login', {
        email: email,
        password: password,
      })
      .then(
        (data) => {
          setErrorText('');
          cookie.save(Statics.ACCESS_TOKEN, data.accessToken, {
            path: '/',
          });
          cookie.save(Statics.REFRESH_TOKEN, data.refreshToken, {
            path: '/',
          });
          dispatch(userLogin());
          window.location.href = '/';
        },
        (error) => {
          setErrorText(error.response.data.error);
        }
      );
  };

  return (
    <div className='vertical-center'>
      <Header title='Task App' />

      {errorText.length > 0 ? (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>{errorText}</strong>
        </Alert>
      ) : (
        ''
      )}

      <form
        style={{
          width: '40%',
          margin: 'auto',
          height: '100%',
          paddingTop: '100px',
        }}
        onSubmit={onSubmit}
      >
        <div className='form-control'>
          <label>Email</label>
          <input
            type='email'
            required='required'
            placeholder='UserName'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input
            type='password'
            placeholder='password'
            value={password}
            required='required'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-block'
          style={{ background: 'green' }}
        />
      </form>
    </div>
  );
};

export default Login;
