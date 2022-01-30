import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  .back-button {
    background: none;
    border: none;
    svg {
      height: 24px;
      width: auto;
      color: black;
      transition: color 0.2s;
      :hover {
        color: #3498db;
      }
    }
  }
`;
export const Content = styled.div`
  display: grid;
  grid-template-rows: 5% 45% 45%;
  row-gap: 5px;
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
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TextContainer = styled.div`
  padding: 5px;
`;
