import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaImage } from 'react-icons/fa';

import { Container, Image, Texts } from './styles';

export default function Card({
  onClick,
  itemId,
  name = 'Titulo',
  notes = 'Paragrafo',
  files = [],
  ...rest
}) {
  const [urls, setUrls] = useState('');
  const [url, setUrl] = useState('');
  const [index, setIndex] = useState(0);

  // const visibility = React.useContext(VisibilityContext);
  // const visible = visibility.isItemVisible(itemId);

  const changeImage = useCallback(
    (moveBy = 1) => {
      if (urls.length > 0) {
        let newIndex = index + moveBy;
        if (newIndex > urls.length - 1) newIndex = 0;
        if (newIndex < 0) newIndex = urls.length - 1;
        setIndex(newIndex);
      }
    },
    [index, urls]
  );

  useEffect(() => {
    if (files?.length) {
      setUrls(files.map(({ url: currentUrl }) => currentUrl));
    }
  }, [files]);

  useEffect(() => {
    setUrl(urls[index]);
  }, [urls, url, index]);

  useEffect(() => {
    const changeImageInterval = setInterval(() => changeImage(), 5000);
    return () => {
      clearInterval(changeImageInterval);
    };
  }, [changeImage]);

  return (
    <Link to={`/product/${itemId}`}>
      <Container onClick={() => onClick()} role="button" tabIndex={0} {...rest}>
        <Image hasUrl={url}>{!url && <FaImage />}</Image>
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
  onClick: PropTypes.func,
  itemId: PropTypes.string.isRequired,
  name: PropTypes.string,
  notes: PropTypes.string,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};
Card.defaultProps = {
  onClick: () => {},
  name: 'Name',
  notes: 'Notes',
  files: [],
};
