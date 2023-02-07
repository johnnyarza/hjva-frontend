import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const Content = styled.div`
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
`;

export const About = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 8px;
`;
export const TextContainer = styled.div`
  margin-top: 8px;
  text-align: center;
`;
export const TextParagraf = styled.pre`
  font: 16px 'Roboto';
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
`;
export const TextTitle = styled.h3`
  text-align: center;
`;
export const ImageContainer = styled.div``;
export const ImageContent = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 300px;
  border-radius: 10px;

  ${({ hasUrl }) =>
    hasUrl
      ? css`
          background-image: url(${hasUrl});
        `
      : css``}
`;
export const Buttons = styled.div`
  background: none;
  border: none;
  display: flex;
  justify-content: end;

  ${({ disabled }) => {
    return disabled
      ? css`
          svg {
            color: #ebebeb;
          }
        `
      : css`
          svg {
            color: black;
            :hover {
              color: #3498db;
              cursor: pointer;
            }
          }
        `;
  }}

  svg {
    height: 24px;
    width: auto;
    transition: color 0.2s;
  }
  button {
    background: none;
    border: none;
    ${({ disabled }) =>
      disabled
        ? css`
            cursor: progress;
          `
        : css``}
  }
`;
export const TopBar = styled.h3`
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;

  button {
    min-height: 25px;
    font: 16px 'Roboto';
    min-width: 80px;
    border: none;
    border-radius: 5px;
    transition: all 0.2s;
    padding-left: 5px;
    padding-right: 5px;

    margin-left: 10px;

    font-weight: 500;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
      background-color: #2ecc71;
    }

    &:active {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 15px;
    }
  }
`;
