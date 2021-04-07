import styled from 'styled-components';
// import { Form as form } from '@rocketseat/unform';

// export const Form = styled(form)`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   span {
//     font-size: 16px;
//   }
//   input {
//     border-radius: 15px;
//     border: none;
//     padding: 5px;
//     font-size: 16px;
//   }
// `;

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 64px;
    padding: 8px;
    min-height: 25px;
    border: none;
    border-radius: 25px;
    color: white;
    font-weight: 500;
    font-size: 16px;
    margin-right: 10px;
    transition: all 0.2s;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    span {
      display: block;
    }

    svg {
      color: black;
      margin-right: 5px;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
    }
  }

  div {
    background-color: white;
    margin-bottom: 15px;
    border-radius: 15px;
    width: 100%;
    max-width: 900px;
    padding: 20px;
  }

  .row-data {
    height: 30px;

    &:hover {
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  max-width: 900px;
  min-height: 60px;
  width: 100%;
  display: flex;
`;

export const TableContainer = styled.div`
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 5px;
  }

  h1 {
    margin-bottom: 10px;
    border-bottom: solid 1px #ebebeb;
    font-size: 20px;
  }

  table {
    table-layout: fixed;
    width: 100%;
    white-space: nowrap;
    display: none;

    svg {
      height: 20px;
      width: 20px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  th,
  td {
    text-align: left;
    border-bottom: solid 1px #ebebeb;
  }
`;
