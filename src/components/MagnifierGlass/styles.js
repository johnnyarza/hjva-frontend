import styled, { css } from 'styled-components';

export const Content = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  transition: background 0.5s ease-out;
  display: block;
  ${(props) =>
    props.isImgLoaded
      ? ''
      : css`
          -webkit-animation: fadeInFromNone 0.5s ease-out infinite;
          -moz-animation: fadeInFromNone 0.5s ease-out infinite;
          -o-animation: fadeInFromNone 0.5s ease-out infinite;
          animation: fadeInFromNone 0.5s ease-out infinite;
        `}
  ${(props) => {
    return props.hasUrl
      ? css`
          background: url(${props.hasUrl});
        `
      : '';
  }}
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  @-webkit-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-o-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }
`;

export const Glass = styled.div`
  position: absolute;
  border: 1px solid transparent;
  z-index: 3;
  width: ${({ isMobile }) => (isMobile ? '72px' : '100px')};
  height: ${({ isMobile }) => (isMobile ? '72px' : '100px')};
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.8) 0 0 8px;
  visibility: ${({ showGlass }) => (showGlass ? 'visible' : 'hidden')};

  ${(props) => {
    return props.hasUrl
      ? css`
          background: url(${props.hasUrl});
        `
      : '';
  }}
  background-color:rgba(255, 255, 255, 0.7);
  background-repeat: no-repeat;
  background-size: ${(props) => {
    const { parentDims, zoom } = props;
    if (parentDims && zoom) {
      const { width, height } = parentDims;
      return `${width * zoom}px ${height * zoom}px`;
    }
    return '';
  }};
`;
