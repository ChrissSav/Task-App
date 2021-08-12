import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Main} />
      <Route exact path='/login' component={Login} />
    </Router>
  );
}

export default App;
