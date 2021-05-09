import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Description, ProductName, ProductText } from './style';

const ProductCard = ({ text, description, file }) => {
  const [files, setFiles] = useState([]);
  const [fileIndex, setFileIndex] = useState(0);

  useEffect(() => {
    setFiles(file);
  }, [file]);

  const handleImgChange = useCallback(
    (to = 'next') => {
      if (files.length) {
        let index = fileIndex;

        if (to === 'next') {
          index += 1;
        } else {
          index -= 1;
        }

        if (index < 0) index = files.length - 1;
        if (index > files.length - 1) index = 0;
        setFileIndex(index);
      }
    },
    [files, fileIndex]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      handleImgChange();
    }, 3000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, [handleImgChange]);

  return (
    <Container>
      <div style={{ alignSelf: 'center' }}>
        <img
          src={
            file[fileIndex]?.url ||
            'https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          }
          alt="bloco"
        />
      </div>
      <Description>
        <ProductName>
          <span>{text}</span>
        </ProductName>
        <ProductText>{description}</ProductText>
      </Description>
    </Container>
  );
};

ProductCard.propTypes = {
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductCard;
