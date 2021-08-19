import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import axiosApp from '../Util/axiosApp';
import cookie from 'react-cookies';
import Statics from '../Util/Statics';

const Register = (props) => {
  const [firstName, setFirstName] = useState('setFirstName');
  const [lastName, setLastName] = useState('setLastName');
  const [email, setEmail] = useState('firstNadme@gmail.com');
  const [password, setPassword] = useState('firstName');
  const [errorText, setErrorText] = useState('');

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
      .post('/register', {
        firstName,
        lastName,
        email,
        password,
      })
      .then(({ data }) => {
        setErrorText('');
        console.log(data);
        cookie.save(Statics.ACCESS_TOKEN, data.data.accessToken, {
          path: '/',
        });
        cookie.save(Statics.REFRESH_TOKEN, data.data.refreshToken, {
          path: '/',
        });
        window.location.href = '/';
      });
  };

  return (
    <div>
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
          <label>First name</label>
          <input
            type='text'
            placeholder='first name'
            value={firstName}
            required='required'
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className='form-control'>
          <label>Last name</label>
          <input
            type='text'
            placeholder='last name'
            value={lastName}
            required='required'
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className='form-control'>
          <label>Email</label>
          <input
            type='email'
            required='required'
            placeholder='email'
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
          value='Register'
          className='btn btn-block'
          style={{ background: 'green' }}
        />
      </form>
    </div>
  );
};

export default Register;
