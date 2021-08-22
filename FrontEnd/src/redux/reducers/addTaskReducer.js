const addTaskReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return action.payload;
    default:
      return null;
  }
};

export default addTaskReducer;
