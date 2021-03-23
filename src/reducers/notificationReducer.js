const initialState = {
  message: '',
  className: 'error'
}

let timeoutId;

export const closeNotification = () => {
  return {
    type: 'CLOSE_NOTIFICATION'
  }
}

export const setNotification = (message, className, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_NOTIFICATION',
      message,
      className
    });

    if(timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLOSE_NOTIFICATION' });
    }, timeout*1000);
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case('UPDATE_NOTIFICATION'):
      return { message: action.message, className: action.className };
    case('CLOSE_NOTIFICATION'):
      return { message: '' };
    default: return state;
  }
}

export default notificationReducer
