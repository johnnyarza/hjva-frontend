import React from 'react';
import PropTypes from 'prop-types';
import { MenuButton } from '@szhsin/react-menu';
import { FaPrint } from 'react-icons/fa';

export default function PrintMenuButton({ url }) {
  return (
    <MenuButton>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaPrint />
        </div>
      </a>
    </MenuButton>
  );
}

PrintMenuButton.propTypes = {
  url: PropTypes.string.isRequired,
};
