import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { uniqueId } from 'lodash';

import { Container, Content, Arrow, Empty, ImageControls } from './styles';

function ImagesSlide({ images, setImages }) {
  const [currentImages, setCurrentImages] = useState('');
  const [currentImage, setCurrentImage] = useState('');
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

  const handleRemoveImg = () => {
    const { auxId, id } = currentImage;
    let newImages = [...currentImages];
    if (auxId) {
      newImages = currentImages.filter((file) => file.auxId !== auxId);
    }
    if (id) {
      newImages.forEach((file) => {
        if (file.id === id) {
          file.toDelete = true;
        }
      });
    }
    setCurrentImages(newImages);
  };

  const handleAddImg = (files) => {
    if (files) {
      const newFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const { name } = file;
        const auxId = uniqueId();

        newFiles.push({
          file,
          name,
          auxId,
          url: URL.createObjectURL(file),
        });
      }
      setCurrentImages([...currentImages, ...newFiles]);
    }
  };

  return (
    <Container>
      {currentImages.length && currentImage ? (
        <>
          <Arrow onClick={() => changeImage(-1)} type="button">
            <FaAngleDoubleLeft />
          </Arrow>
          <Content hasUrl={currentImage?.url} />
          <Arrow onClick={() => changeImage()} type="button">
            <FaAngleDoubleRight />
          </Arrow>
        </>
      ) : (
        <Empty />
      )}
      <ImageControls>
        <label htmlFor="file">
          <span>+</span>
          <input
            type="file"
            id="file"
            multiple
            onChange={(f) => handleAddImg(f.target.files)}
            accept="image/jpeg,
          image/pjpeg,
          image/png,
          image/gif"
          />
        </label>
        <button
          type="button"
          style={{ backgroundColor: 'var(--cancelButton)' }}
          onClick={handleRemoveImg}
        >
          <span>-</span>
        </button>
      </ImageControls>
    </Container>
  );
}
ImagesSlide.propTypes = {
  setImages: PropTypes.func,
  images: PropTypes.arrayOf,
};

ImagesSlide.defaultProps = {
  setImages: () => {},
  images: [],
};
export default ImagesSlide;
