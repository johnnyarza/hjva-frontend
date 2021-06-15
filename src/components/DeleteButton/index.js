import React, { useEffect, useState } from 'react';
import { MdDelete, MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';

// import { Container } from './styles';

function DeleteButton({ onClick, delay, ...rest }) {
  const [wasClicked, setWasClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWasClicked(false), 1000 * delay);
    return () => {
      clearTimeout(timer);
    };
  }, [wasClicked]);

  const handleClick = () => {
    setWasClicked(true);
    if (wasClicked) {
      onClick();
    }
  };
  return (
    <button type="button" onClick={handleClick} {...rest}>
      {!wasClicked ? (
        <MdDelete />
      ) : (
        <MdDeleteForever style={{ color: '#e74c3c' }} />
      )}
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

DeleteButton.defaultProps = {
  delay: 1,
};

export default DeleteButton;
