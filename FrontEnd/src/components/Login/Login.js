import React, { useState } from 'react';
import axiosApp from '../../axiosApp';

const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('roijgiurgrg');

    if (password && email) {
      axiosApp.post('/login', {
        username: email,
        password: password,
      });
    }

    //window.location.href = '/';
    //history.push('/');
  };

  return (
    <div className='vertical-center'>
      <form
        style={{ width: '40%', margin: 'auto', height: '100%' }}
        onSubmit={onSubmit}
      >
        <div className='form-control'>
          <label>UserName</label>
          <input
            type='text'
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
