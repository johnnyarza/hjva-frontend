import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  max-height: 600x;
  margin: none !important;
`;
export const Content = styled.div`
  position: ${(props) => (props.isChangingPassword ? 'relative' : 'static')};
  overflow: hidden;
  min-height: 410px;
  overflow-y: hidden;
`;
