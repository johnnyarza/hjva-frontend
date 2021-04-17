import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  max-height: 600x;
`;
export const Content = styled.div`
  position: ${(props) => (props.isChangingPassword ? 'relative' : 'static')};
  top: -100px;
  overflow: hidden;
  min-height: 410px;
  overflow-y: hidden;
  .avatar {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    align-self: center;
    margin-bottom: 15px;
  }
`;
