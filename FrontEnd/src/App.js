import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cookie from 'react-cookies';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { setAddTaskAction } from './redux/actions/setAddTask';
import { userLogout } from './redux/actions/userLogout';
import Statics from './components/Util/Statics';

function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const [showAddTask, setShowAddTask] = useState(false);
  const errorText = useSelector((state) => state.errorText);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = (e) => {
    if (e.target.firstChild.data === 'logout') {
      dispatch(userLogout());
    }
    setOpenDialog(false);
  };

  // set delay because the collapse is lagging on open
  useEffect(() => {
    if (errorText.length > 1) {
      setOpen(true);
      window.setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      setOpen(false);
    }
  }, [errorText]);

  useEffect(() => {
    if (!isLogged) {
      cookie.remove(Statics.REFRESH_TOKEN);
      cookie.remove(Statics.ACCESS_TOKEN);
      setShowAddTask(false);
    }
  }, [isLogged]);

  const addTask = (task) => {
    axiosApp.post('/tasks', task).then((data) => {
      dispatch(setAddTaskAction(data));
      setShowAddTask(false);
    });
  };

  return (
    <Router>
      <Collapse
        in={open}
        onClick={() => {
          setOpen(false);
        }}
      >
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>{errorText}</strong>
        </Alert>
      </Collapse>
      <Header
        isOpen={showAddTask}
        showButtons={isLogged}
        onAddClick={() => {
          setShowAddTask(!showAddTask);
        }}
        onLogoutClick={() => {
          setOpenDialog(true);
        }}
      />
      <Collapse in={showAddTask}>
        <AddTask onAdd={addTask} deleteAll={showAddTask} />
      </Collapse>

      <Route exact path='/' render={() => (isLogged ? <Main /> : <Redirect to='/login' />)} />
      <Route exact path='/login' render={() => (!isLogged ? <Login /> : <Redirect to='/' />)} />
      <Route exact path='/register' render={() => (!isLogged ? <Register /> : <Redirect to='/' />)} />

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Please confirm the logout action</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id={'ropjhiogr'} onClick={(e) => handleClose(e)} color='primary' autoFocus>
            stay
          </Button>
          <Button id={'ropjhiogr'} onClick={(e) => handleClose(e)} color='primary'>
            logout
          </Button>
        </DialogActions>
      </Dialog>
    </Router>
  );
}

export default App;
