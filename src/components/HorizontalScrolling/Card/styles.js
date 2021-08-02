import styled, { css } from 'styled-components';

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

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
  }
`;

export const Image = styled.div`
  height: 60%;
  width: auto;
  border-bottom: 1px solid #ebebeb;
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

export const Title = styled.div`
  height: 40%;
  padding: 20px;

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
