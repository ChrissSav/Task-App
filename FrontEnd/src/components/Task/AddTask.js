import { useEffect, useState } from 'react';
import Statics from '../Util/Statics';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

const AddTask = ({ onAdd, deleteAll }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date());

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ text: text, timestamp: Statics.toTimestamp(date) });
    setText('');
    setDate('');
  };

  useEffect(() => {
    if (deleteAll) {
      setText('');
      setDate(new Date());
      deleteAll = false;
    }
  }, [deleteAll]);

  return (
    <div className='add-form-div'>
      <form
        className='add-form'
        onSubmit={onSubmit}
        style={{ margin: '30px', paddingBottom: '30px' }}
      >
        <TextField
          id='standard-basic'
          required
          value={text}
          onChange={(d) => {
            setText(d.target.value);
          }}
          style={{ width: '100%' }}
          label='Task description'
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className='customDatePickerWidth'
            disableToolbar
            minDate={new Date()}
            variant='inline'
            format='dd/MM/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='Date'
            required
            value={date}
            style={{ width: '100%', marginTop: '50px' }}
            onChange={(d) => {
              setDate(d);
            }}
          />
        </MuiPickersUtilsProvider>
        <input
          type='submit'
          value='Save Task'
          className='btn btn-block'
          style={{ background: 'green', marginTop: '50px' }}
        />
      </form>
    </div>
  );
};

export default AddTask;
