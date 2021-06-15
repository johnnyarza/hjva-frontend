import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div``;
export const Content = styled.div`
  position: relative;
  display: flex;
`;

export const LanguageOption = styled.div`
  span {
    ${(props) =>
      props.isSelected
        ? css`
            font-weight: 600;
          `
        : ''}
    :hover {
      font-weight: 600;
      color: #3498db;
    }
  }
`;

export const LanguageList = styled.div`
  position: absolute;
  background-color: white;
  width: 100px;
  left: calc(50% - 50px);
  top: calc(100% + 15px);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgba(0, 0, 0, 0.6);
  }
`;

export const Scroll = styled(PerfectScrollbar)``;
