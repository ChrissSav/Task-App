import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/userLogin';
import axiosApp from '../Util/axiosApp';
import Statics from '../Util/Statics';
import PasswordField from 'material-ui-password-field';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const [email, setEmail] = useState('firstNadme@gmail.com');
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('firstName');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorText('');
    axiosApp
      .post('/login', {
        email: email,
        password: password,
      })
      .then((data) => {
        setErrorText('');
        Statics.saveAccessRefreshToken(data.accessToken, data.refreshToken);
        dispatch(userLogin());
        window.location.href = '/';
      });
  };

  return (
    <div>
      {errorText.length > 0 ? (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>{errorText}</strong>
        </Alert>
      ) : (
        ''
      )}

      <form className='login-register-form' onSubmit={onSubmit}>
        <div>
          <TextField
            required
            className='login-form-input'
            style={{ width: '100%', marginBottom: '60px' }}
            label='Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormControl required style={{ width: '100%', marginBottom: '100px' }}>
            <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
            <PasswordField
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
        </div>

        <input type='submit' value='Login' className='btn btn-block' style={{ background: 'green' }} />
      </form>

      <div className='center'>
        <h3>
          If you don't have an account.
          <i>
            {' '}
            <a href='/register'>Register now.</a>{' '}
          </i>{' '}
        </h3>
      </div>
    </div>
  );
};

export default Login;
