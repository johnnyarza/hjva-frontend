import React, { useCallback, useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import utils from '../../../utils';

import { Card as Container, Img, Texts } from './styles';

function Card({ name = 'Nombre', notes = 'notes', images = [] }) {
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <Container>
      <Img hasUrl={currentImages[currentIndex]} title={name}>
        {!currentImages[currentIndex] && <FaImage />}
      </Img>
      <Texts>
        <div className="title">
          <h3>{name}</h3>
        </div>
        <div className="notes">
          <p>{notes}</p>
        </div>
      </Texts>
    </Container>
  );
}

export default Card;
