import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const Content = styled.div`
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
`;

export const About = styled.div`
  border-bottom: 1px solid ${darken(0.2, '#ebebeb')};
  margin-bottom: 8px;
`;
export const TextContainer = styled.div`
  margin-top: 8px;
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
