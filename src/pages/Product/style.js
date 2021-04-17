import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;
export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 15px 30px;
  border-radius: 15px;

  img {
    max-width: 400px;
  }
  .product-price {
    position: absolute;
    bottom: 20px;
    right: 40px;
  }
  .edit-icon {
    background-color: #2ecc71;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: none;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    right: 0;
    top: -10px;
    transition: box-shadow 0.2s;

    svg {
      width: 25px;
      height: 25px;
    }
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
    }
    &:active {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 15px;
    }
  }

  img {
    width: 668px;
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  padding: 15px 24px;
  border: 1px solid #ebebeb;
  border-radius: 15px;

  .product-name {
    display: flex;
    h1 {
      text-align: left;
    }
  }

  .product-details {
    margin-top: 30px;
    max-height: 150px;
    overflow-y: auto;
    overflow-x: auto;
    overflow-wrap: break-word;
    max-width: 380px;

    p {
      font-size: 16px;
      display: inline;
      text-align: justify;
    }

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

export const ProductText = styled.div`
  ${css``}
`;
