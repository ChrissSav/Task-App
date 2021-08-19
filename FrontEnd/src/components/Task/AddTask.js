import { useState } from 'react';
import Statics from '../Util/Statics';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a task');
      return;
    }
    onAdd({ text: text, timestamp: Statics.toTimestamp(date) });
    setText('');
    setDate('');
  };

  return (
    <form
      className='add-form'
      onSubmit={onSubmit}
      style={{ margin: '30px', paddingBottom: '30px' }}
    >
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='date'
          placeholder='Add Day & Time'
          value={date}
          required
          onChange={(e) => {
            // const date = moment(
            //   e.target.value,
            //   Statics.TASK_DATE_FORMAT
            // ).format(Statics.TASK_DATE_FORMAT);
            setDate(e.target.value);
          }}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  );
};

export default AddTask;
