import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/userLogin';
import axiosApp from '../Util/axiosApp';
import Statics from '../Util/Statics';

const Register = () => {
  const [firstName, setFirstName] = useState('setFirstName');
  const [lastName, setLastName] = useState('setLastName');
  const [email, setEmail] = useState('firstNadme@gmail.com');
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
    axiosApp
      .post('/register', {
        firstName,
        lastName,
        email,
        password,
      })
      .then((data) => {
        //console.log(data);
        cookie.save(Statics.ACCESS_TOKEN, data.accessToken, {
          path: '/',
        });
        cookie.save(Statics.REFRESH_TOKEN, data.refreshToken, {
          path: '/',
        });
        dispatch(userLogin());
        window.location.href = '/';
      });
  };

  return (
    <div>
      <form
        style={{
          width: '80%',
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
            required
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
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className='form-control'>
          <label>Email</label>
          <input
            type='email'
            required
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
            required
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
