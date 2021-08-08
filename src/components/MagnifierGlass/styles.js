import styled, { css } from 'styled-components';

export const Content = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  transition: background 0.5s ease-out;
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
`;

export const Glass = styled.div`
  position: absolute;
  border: 1px solid transparent;
  z-index: 3;
  width: ${({ isMobile }) => (isMobile ? '64px' : '100px')};
  height: ${({ isMobile }) => (isMobile ? '64px' : '100px')};
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.8) 0 0 8px;

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
