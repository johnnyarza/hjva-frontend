import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  border: 1px transparent;
  border-radius: 15px;
  padding: 15px;
  display: inline-block;
  margin: 0 10px;
  width: 285px;
  height: 480px;
  user-select: none;
  cursor: pointer;
  background-color: white;
  a {
    color: black;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
  }
`;

export const Image = styled.div`
  height: 60%;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  transition: background 0.5s ease-out;
  ${(props) => {
    return props.hasUrl
      ? css`
          background: url(${props.hasUrl});
        `
      : css`
          display: flex;
          justify-content: center;
          align-items: center;
        `;
  }}
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  svg {
    width: 50%;
    height: auto;
    color: ${darken(0.5, '#ebebeb')};
  }
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 40%;

  .title {
    margin-bottom: 5%;
  }

  .notes {
    overflow-y: auto;
    text-align: justify;
    text-justify: inter-word;

    pre {
      font: 16px 'Roboto';
      white-space: pre-wrap; /* css-3 */
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-word;
    }
  }
`;
