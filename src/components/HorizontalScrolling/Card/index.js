import React, { useCallback, useEffect, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import { Container, Image, Title } from './styles';

const urlEx =
  'https://http2.mlstatic.com/D_NQ_NP_998101-MLB45928751274_052021-W.webp';

export default function Card({
  onClick,
  selected,
  title,
  itemId,
  name = 'Titulo',
  notes = 'Paragrafo',
  files = [],
}) {
  const [urls, setUrls] = useState('');
  const [url, setUrl] = useState('');
  const [index, setIndex] = useState(0);

  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(itemId);

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
    <Container
      onClick={() => onClick(visibility)}
      onKeyDown={(ev) => {
        if (ev.code === 'Enter') {
          onClick(visibility);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Image hasUrl={url || urlEx} />
      <Title>
        <div className="title">
          <h3>{name}</h3>
        </div>
        <div className="notes">
          <p>{notes}</p>
        </div>
      </Title>
    </Container>
  );
}
