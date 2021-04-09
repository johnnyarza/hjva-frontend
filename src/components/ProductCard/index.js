import React from 'react';
import PropTypes from 'prop-types';

import { Container, Description, ProductName } from './style';

const ProductCard = ({ text, description, imgSrc }) => (
  <Container>
    <div style={{ alignSelf: 'center' }}>
      <img
        src={
          imgSrc ||
          'https://images.unsplash.com/photo-1573871924474-04f515cf7399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        }
        alt="bloco"
      />
    </div>
    <Description>
      <ProductName>
        <span>{text}</span>
      </ProductName>
      <p className="product-description">{description}</p>
    </Description>
  </Container>
);

ProductCard.propTypes = {
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
};

ProductCard.defaultProps = {
  imgSrc: '',
};

export default ProductCard;
