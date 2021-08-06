import React from 'react';
import PropTypes from 'prop-types';
import ReactWhatsapp from 'react-whatsapp';

export default function WhatsAppFowardButton({
  number,
  message,
  children,
  ...rest
}) {
  return (
    <ReactWhatsapp number={number} message={message} {...rest}>
      {children}
    </ReactWhatsapp>
  );
}

WhatsAppFowardButton.propTypes = {
  number: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
WhatsAppFowardButton.defaultProps = {
  number: '+591 68921153',
  message: 'Hola',
  children: [],
};
