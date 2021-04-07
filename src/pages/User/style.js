import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  max-height: 600x;
`;
export const Content = styled.div`
  position: ${(props) => (props.isChangingPassword ? 'relative' : 'static')};
  top: -100px;
  overflow: hidden;
  img {
    height: 80px;
    width: auto;
  }
`;
