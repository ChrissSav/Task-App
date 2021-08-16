import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/Main';
import Register from './components/register/Register';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Main} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Router>
  );
}

export default App;
