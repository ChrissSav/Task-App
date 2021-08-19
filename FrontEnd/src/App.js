import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/login/Login';
import Main from './components/Main';
import Register from './components/register/Register';
import AddTask from './components/task/AddTask';
import axiosApp from './components/Util/axiosApp';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Collapse } from '@material-ui/core';
import { useDispatch } from 'react-redux';

function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const [showAddTask, setShowAddTask] = useState(false);
  const errorText = useSelector((state) => state.errorText);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ///console.log('user logout useEffect(() isLogged' + isLogged);
    if (isLogged === false) {
      // console.log('user logout now');
      if (!window.location.href.includes('/login')) {
        window.location.href = '/login';
      }
    }
  }, [isLogged]);

  useEffect(() => {
    if (errorText.length > 0) {
      setOpen(true);
      window.setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [errorText]);

  const addTask = (task) => {
    console.log(task);
    axiosApp.post('/task', task).then(() => {});
  };

  return (
    <Router>
      <Collapse in={open}>
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>{errorText}</strong>
        </Alert>
      </Collapse>
      <Header
        showAdd={isLogged}
        onAdd={() => {
          setShowAddTask(true);
        }}
      />
      {showAddTask && <AddTask onAdd={addTask} />}

      <Route exact path='/' component={Main} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Router>
  );
}

export default App;
