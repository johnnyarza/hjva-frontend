import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-left: 130px;
  padding-bottom: 5px;
  min-height: 400px;
  max-height: 600px;
  .title-container {
    display: flex;
    .back-button {
      background: none;
      border: none;
    }
    svg {
      height: 60%;
      width: auto;
      color: black;
      transition: color 0.2s;
      :hover {
        height: #3498db;
      }
    }
    h2 {
      text-align: center;
      margin-bottom: 15px;
      width: 100%;
    }
  }
`;
export const Content = styled.div`
  .table {
    margin-bottom: 5px;
  }
  .edit-buttons-container {
    display: flex;
    justify-content: center;

    button {
      background: none;
      border: none;
      svg {
        width: 18px;
        height: auto;
        transition: color 0.2s;
      }
    }
    .delete-button {
      :hover {
        color: #e74c3c;
      }
    }

    .edit-button {
      :hover {
        color: #3498db;
      }
    }
  }
`;

export const ConcreteSampleContainer = styled.div``;
