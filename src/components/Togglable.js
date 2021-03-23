import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [ visible, setVisible ] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  return(
    <div className="togglableContent">
      { visible && props.children }
      <Button variant="primary" onClick={ toggleVisibility }>
        { visible ? 'cancel' : props.buttonLabel }
      </Button>
    </div>
  )
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable;
