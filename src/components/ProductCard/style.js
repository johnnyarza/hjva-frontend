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
