const reloadTaskReducer = (state = false, action) => {
  switch (action.type) {
    case 'RELOAD_TASKS':
      return true;
    default:
      return false;
  }
};

export default reloadTaskReducer;
