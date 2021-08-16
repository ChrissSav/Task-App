import { FaTimes } from 'react-icons/fa';
import Statics from '../Util/Statics';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{
            color: 'red',
            cursor: 'pointer',
          }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{Statics.getDateFromTimestamp(task.timestamp, 'MMM Do YYYY , h a')}</p>
    </div>
  );
};

export default Task;
