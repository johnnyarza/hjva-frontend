import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const Buttons = styled.div`
  background: none;
  border: none;
  display: flex;
  ${({ userRole }) =>
    userRole === 'admin'
      ? css`
          justify-content: space-between;
        `
      : css`
          justify-content: start;
        `}

  svg {
    height: 24px;
    width: auto;
    color: black;
    transition: color 0.2s;
    :hover {
      color: #3498db;
    }
  }
  button {
    background: none;
    border: none;
  }
`;
export const TextButton = styled.div`
  svg {
    height: 24px;
    width: auto;
    color: black;
    transition: color 0.2s;
    :hover {
      color: #3498db;
    }
  }
  button {
    background: none;
    border: none;
  }
`;
export const Content = styled.div`
  display: grid;
  grid-template-rows: 5% 45% 5% 45%;
  row-gap: 10px;
  background-color: white;
  max-width: 600px;
  width: 100%;
  height: 500px;
  border-radius: 10px;
  padding: 10px;
`;

export const ImgContainer = styled.div``;
export const ImgContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  ${(props) => {
    return props.hasUrl
      ? css`
          background: url(${props.hasUrl});
        `
      : '';
  }}
  /* background-position: center; */
  ${(props) => {
    const position = props.position || 'center';
    return css`
      background-position: ${position};
    `;
  }}
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TextContainer = styled.div`
  border-top: 2px solid #ebebeb;
  padding-top: 5px;
`;
export const TextContent = styled.div`
  width: 100%;
  overflow: auto;
  text-align: center;
  text-justify: inter-word;
  pre {
    font: 16px 'Roboto';
    white-space: pre-wrap; /* css-3 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word;
  }
`;
