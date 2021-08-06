import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const Content = styled.div`
  display: grid;
  grid-template-rows: ${(props) => (props.isMobile ? '50% 50%' : '70% 30%')};
  row-gap: 5px;
  background-color: white;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  height: ${(props) => (props.isMobile ? '500px' : '600px')};
  padding: 15px;
`;
export const Texts = styled.div`
  display: flex;
  border-top: 1px solid #ebebeb;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .notes {
    overflow: auto;
    text-align: justify;
    text-justify: inter-word;
    pre {
      font: 16px 'Roboto';
      white-space: pre-wrap; /* css-3 */
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-word;
    }
  }

  h3 {
    margin-bottom: 5%;
  }
  p,
  h3 {
    font-size: ${(props) => (props.isMobile ? '16px' : '18px')};
  }
`;
