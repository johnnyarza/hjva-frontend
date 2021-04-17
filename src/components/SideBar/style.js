import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  left: 0;
  padding-left: 10px;
  padding-top: 15px;
  font-size: 10px;
  background-color: white;
  height: 100%;
  top: 90px;
  width: 40px;
  transition: width 0.2s;

  &:hover {
    width: 152px;
    span {
      visibility: visible;
    }
  }
`;

export const Content = styled.ul`
  display: inline-block;
`;

export const BarItem = styled.li`
  height: 30px;
  position: relative;
  a {
    display: flex;
    color: black;
    span {
      display: inline-block;
      align-self: center;
      margin-left: 30px;
      font-size: 15px;
      position: absolute;
      white-space: nowrap;
    }
    svg,
    img {
      width: 20px;
      height: 20px;
      &:hover {
        color: ${lighten(0.5, '#000')};
      }
    }

    &:hover {
      color: ${lighten(0.5, '#000')};
    }
  }
`;
