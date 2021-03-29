import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px 15px;
`;

export const Arrow = styled.div`
  font-size: 30px;
  width: 80px;
  height: 50px;
  border-radius: 60px;
  background-color: orange;
  text-align: center;
  display: table-cell;
  overflow: hidden;
  vertical-align: middle;
  transition: box-shadow 0.2s;
  background-color: white;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
  }
`;
