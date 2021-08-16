import AddTask from './task/AddTask';
import Header from '../components/Header';
import Tasks from './task/Tasks';

import { useState, useEffect } from 'react';
import Statics from './Util/Statics';
import cookie from 'react-cookies';
import axiosApp from './Util/axiosApp';

const Main = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = cookie.load(Statics.REFRESH_TOKEN);
    if (!token) {
      window.location.href = '/login';
    }

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Add Task
  const addTask = (task) => {
    console.log(task);

    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    // const res = await fetch('http://localhost:5000/tasks', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
    // });
  };
  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await axiosApp.get('/task');
    const data = await res.data;
    return data.data;
  };

  return (
    <div className='contadiner'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks to Show'
      )}
    </div>
  );
};

//access-control-allow-credentials: true
//access-control-allow-origin: http://localhost:3000

export default Main;
