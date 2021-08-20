import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tasks from './task/Tasks';
import axiosApp from './Util/axiosApp';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const reloadTasks = useSelector((state) => state.reloadTasks);

  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  useEffect(() => {
    getTasks();
  }, [reloadTasks]);

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
    return await axiosApp.get('/task');
  };

  return (
    <div className='contadiner'>
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks to Show'
      )}
      <button
        onClick={() => {
          getTasks();
        }}
      >
        rgfregergerg
      </button>
    </div>
  );
};

export default Main;
