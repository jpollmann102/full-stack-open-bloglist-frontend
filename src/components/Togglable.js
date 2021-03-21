import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
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
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable;
