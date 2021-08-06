import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';
import Card from './Card';

function MobileProductCards({ data = [] }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <Container>
      <Content>
        {products.map(({ name, notes, file, id }) => (
          <Card
            name={name}
            notes={notes}
            images={file}
            key={id}
            productId={id}
          />
        ))}
      </Content>
    </Container>
  );
}

MobileProductCards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      file: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    })
  ),
};

MobileProductCards.defaultProps = {
  data: [],
};

export default MobileProductCards;
