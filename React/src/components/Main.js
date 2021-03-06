import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskShimmer from './shimmer/taskShimmer';
import Tasks from './task/Tasks';
import axiosApp from './util/axiosApp';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const newTask = useSelector((state) => state.addTask);

  const getTasks = async () => {
    setTasks([]);
    setLoading(true);
    const tasksFromServer = await axiosApp.get('/tasks');
    setLoading(false);
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
    await axiosApp.delete('/tasks/' + id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (task_id, reminder) => {
    const newTask = await axiosApp.put('/tasks', null, {
      params: {
        task_id,
        reminder: !reminder,
      },
    });

    setTasks(tasks.map((task) => (task.id === task_id ? { ...task, reminder: newTask.reminder } : task)));
  };

  return (
    <div className='container'>
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        !loading && 'No Tasks to Show'
      )}
      {loading && (
        <div>
          <TaskShimmer />
          <TaskShimmer />
          <TaskShimmer />
        </div>
      )}

      <button
        style={{ margin: '40px 10px' }}
        onClick={() => {
          getTasks();
        }}
      >
        Get All Tasks
      </button>
    </div>
  );
};

export default Main;
