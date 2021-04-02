import styled from 'styled-components';

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

  .edit-icon {
    background-color: #2ecc71;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
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
  width: 100%;
  margin-left: 24px;
  padding: 15px 24px;
  border: 1px solid #ebebeb;
  border-radius: 15px;

  .product-name {
    display: flex;
    width: 100%;
    h1 {
      text-align: left;
    }
  }

  .product-details {
    margin-top: 30px;
    p {
      font-size: 16px;
      display: inline;
      text-align: justify;
    }
  }
`;
