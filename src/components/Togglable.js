import React, { useState } from 'react';

const Togglable = (props) => {
  const [ visible, setVisible ] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  return(
    <div>
      { visible && props.children }
      <button onClick={ toggleVisibility }>
        { visible ? 'cancel' : props.buttonLabel }
      </button>
    </div>
  )
}

export default Togglable;
