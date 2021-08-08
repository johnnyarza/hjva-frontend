import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import MagnifierGlass from '../../../components/MagnifierGlass';

import { Container, Arrow, Empty } from './styles';

function Images({ images, setImages }) {
  const [currentImages, setCurrentImages] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [zoom] = useState(2);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setImages(currentImages);
  }, [currentImages, setImages]);

  const changeImage = useCallback(
    (moveBy = 1) => {
      if (currentImages.length > 0) {
        let newIndex = index + moveBy;
        if (newIndex > currentImages.length - 1) newIndex = 0;
        if (newIndex < 0) newIndex = currentImages.length - 1;
        setIndex(newIndex);
      }
    },
    [index, currentImages]
  );

  useEffect(() => {
    if (images) {
      setCurrentImages(images);
    }
  }, [images]);

  useEffect(() => {
    if (
      currentImages.length > 0 &&
      currentImages.find((image) => !image.toDelete)
    ) {
      let image = currentImages[index];
      if (image.toDelete) {
        changeImage();
      }
      if (!image.toDelete) {
        image = image?.url ? image : '';
        setCurrentImage(image);
      }
    }
    if (
      currentImages.length > 0 &&
      !currentImages.find((image) => !image.toDelete)
    )
      setCurrentImage('');
  }, [currentImages, index, changeImage]);

  return (
    <Container>
      {currentImages.length && currentImage ? (
        <>
          <Arrow onClick={() => changeImage(-1)} type="button">
            <FaAngleDoubleLeft />
          </Arrow>
          <MagnifierGlass imgUrl={currentImage?.url} zoom={zoom} />
          <Arrow onClick={() => changeImage()} type="button" zoom={zoom}>
            <FaAngleDoubleRight />
          </Arrow>
        </>
      ) : (
        <Empty />
      )}
    </Container>
  );
}
Images.propTypes = {
  setImages: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string,
      key: PropTypes.string,
    })
  ),
};

Images.defaultProps = {
  setImages: () => {},
  images: [],
};
export default Images;
