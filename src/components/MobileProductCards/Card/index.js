import React, { useCallback, useEffect, useState } from 'react';
import BackgroundImageOnLoad from 'background-image-on-load';
import PropTypes from 'prop-types';
import { FaImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Card as Container, Img, Texts } from './styles';

import utils from '../../../utils';
import logo from '../../../assets/HJVA-logo.gif';

function Card({
  name = 'Nombre',
  notes = 'notes',
  images = [],
  productId,
  ...rest
}) {
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    if (images.length) {
      setCurrentImages(images.map(({ url }) => url));
    }
  }, [images]);

  const changeImage = useCallback(() => {
    if (currentImages.length) {
      const newIndex = utils.getArrayNewIndex(1, currentImages, currentIndex);
      setCurrentIndex(newIndex);
    }
  }, [currentImages, currentIndex]);

  useEffect(() => {
    const changeImageInterval = setInterval(() => changeImage(), 5000);
    return () => {
      clearInterval(changeImageInterval);
    };
  }, [changeImage]);

  return (
    <Link to={`/product/${productId}`}>
      <Container {...rest}>
        <Img
          hasUrl={isImgLoaded ? currentImages[currentIndex] : logo}
          title={name}
          isImgLoaded={isImgLoaded}
        >
          {!currentImages[currentIndex] && <FaImage />}
          <BackgroundImageOnLoad
            src={currentImages[currentIndex]}
            onLoadBg={() => {
              setIsImgLoaded(true);
            }}
          />
        </Img>
        <Texts>
          <div className="title">
            <h3>{name}</h3>
          </div>
          <div className="notes">
            <pre>{notes}</pre>
          </div>
        </Texts>
      </Container>
    </Link>
  );
}
Card.propTypes = {
  name: PropTypes.string,
  notes: PropTypes.string,
  id: PropTypes.string,
  productId: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

Card.defaultProps = {
  name: '',
  notes: '',
  id: '',
  productId: '',
  images: [],
};
export default Card;
