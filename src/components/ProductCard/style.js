import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 10px;
  user-select: none;
  cursor: pointer;
  border: none;
  background-color: white;
  border-radius: 10px;
  width: 240px;
  height: 330px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 15px;
  }

  img {
    width: 224px;
    height: 224px;
    padding: 20px 20px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  .product-description {
    display: block;
  }
  span {
    display: inline-block;
    margin-bottom: 5px;
  }
`;

export const ProductName = styled.div`
  display: flex;
  border-bottom: solid 1px #ebebeb;
  font-weight: bold;
  align-content: flex-start;
  span {
    margin-left: 15px;
    font-size: 18px;
  }
`;

export const EditIcon = styled.div`
  display: flex;
  position: absolute;
  top: -5px;
  border: solid 1px;
  border-radius: 35px;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  z-index: 100px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
  }
  > svg {
    width: 25px;
    height: 25px;
  }
`;

export const ProductText = styled.div`
  padding: 10px 10px 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
