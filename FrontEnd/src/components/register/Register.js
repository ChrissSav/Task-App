import React, { useState } from 'react';
import cookie from 'react-cookies';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/userLogin';
import axiosApp from '../Util/axiosApp';
import Statics from '../Util/Statics';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import PasswordField from 'material-ui-password-field';
import { FormControl } from '@material-ui/core';

const Register = () => {
  const [firstName, setFirstName] = useState('setFirstName');
  const [lastName, setLastName] = useState('setLastName');
  const [email, setEmail] = useState('firstNadme@gmail.com');
  const [password, setPassword] = useState('firstName');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    axiosApp
      .post('/register', {
        firstName,
        lastName,
        email,
        password,
      })
      .then((data) => {
        //console.log(data);
        Statics.saveAccessRefreshToken(data.accessToken, data.refreshToken);
        dispatch(userLogin());
        window.location.href = '/';
      });
  };

  return (
    <div>
      <form className='login-register-form' onSubmit={onSubmit}>
        <TextField
          required
          style={{ width: '100%', marginBottom: '35px' }}
          label='Firs name'
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          style={{ width: '100%', marginBottom: '35px' }}
          label='Last name'
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <TextField
          required
          type='email'
          style={{ width: '100%', marginBottom: '35px' }}
          label='Last name'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <FormControl required style={{ width: '100%', marginBottom: '80px' }}>
          <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
          <PasswordField
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>

        <input type='submit' value='Register' className='btn btn-block' style={{ background: 'green' }} />
      </form>
      <div className='center'>
        <h3>
          If you have an account.
          <i>
            {' '}
            <a href='/login'>Login now.</a>{' '}
          </i>{' '}
        </h3>
      </div>
    </div>
  );
};

export default Register;
