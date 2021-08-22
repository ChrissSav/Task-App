import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tasks from './task/Tasks';
import axiosApp from './Util/axiosApp';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const newTask = useSelector((state) => state.addTask);

  const getTasks = async () => {
    const tasksFromServer = await axiosApp.get('/task');
    setTasks(tasksFromServer);
  };

  useEffect(() => {
    if (newTask !== null) {
      setTasks([...tasks, newTask]);
    } else if (newTask === null && tasks.length === 0) {
      getTasks();
    }
  }, [newTask]);

  const deleteTask = async (id) => {
    await axiosApp.delete('/task/' + id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
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
