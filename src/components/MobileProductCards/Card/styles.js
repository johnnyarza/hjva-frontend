import styled, { css } from 'styled-components';

export const Card = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  height: 300px;
  width: 200px;
  & + div {
    margin-top: 8px;
  }
`;

export const Img = styled.div`
  height: 60%;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  transition: background 0.3s ease-out;
  ${(props) => {
    return props.hasUrl
      ? css`
          background: url(${props.hasUrl});
        `
      : css`
          display: flex;
          justify-content: center;

          svg {
            width: 20%;
            height: auto;
          }
        `;
  }}
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Texts = styled.div`
  height: 40%;
  padding-top: 8px;
  p,
  h3 {
    word-wrap: break-word;
  }
  .title,
  .notes {
    overflow: hidden;
  }
  .title {
    height: 40%;
    padding-bottom: 10px;
  }
  .notes {
    height: auto;
  }
`;
