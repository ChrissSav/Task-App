import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/Main';
import Register from './components/register/Register';

function App() {
  const isLogged = useSelector((state) => state.isLogged);

  useEffect(() => {
    console.log('user logout useEffect(() isLogged' + isLogged);
    if (isLogged === false) {
      console.log('user logout now');
      if (window.location.href !== 'http://localhost:3000/login') {
        window.location.href = '/login';
      }
    }
  }, [isLogged]);

  return (
    <Router>
      <Route exact path='/' component={Main} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Router>
  );
}

export default App;
