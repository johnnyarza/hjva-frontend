import styled, { css } from 'styled-components';

export const Card = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  height: 400px;
  width: 200px;
`;

export const Img = styled.div`
  height: 60%;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  transition: background 0.3s ease-out;
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

export const Texts = styled.div`
  display: flex;
  border-top: 1px solid #ebebeb;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  height: 40%;

  .notes {
    overflow: auto;
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

  h3 {
    margin-bottom: 5%;
  }
  p,
  h3 {
    font-size: 16px;
  }
`;
