import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    display: notification.message === '' ? 'none' : '',
    marginTop: '10px'
  }

  return (
    <div style={ style } className={ notification.className }>
      { notification.message }
    </div>
  )
}

export default Notification;
