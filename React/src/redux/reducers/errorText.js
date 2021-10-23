const errorTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ERROR_TEXT':
      return action.payload;
    default:
      return '';
  }
};

export default errorTextReducer;
