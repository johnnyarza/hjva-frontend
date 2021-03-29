import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
`;

export const Arrow = styled.div`
  font-size: 30px;
  width: 50px;
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
