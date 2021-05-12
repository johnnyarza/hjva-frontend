import styled from 'styled-components';

export const Container = styled.div`
  ${
    '' /* These styles are suggested for the table fill all available space in its containing element */
  }
  display: block;
  ${
    '' /* These styles are required for a horizontaly scrollable table overflow */
  }
  overflow-x: auto;
  background-color: white;
  border-radius: 5px;

  .table {
    border-spacing: 0;
    border: none;

    .thead {
      ${
        '' /* These styles are required for a scrollable body to align with the header properly */
      }
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}

      max-height: 500px;
    }

    .tr {
      transition: all 0.2s;
      :nth-child(even) {
        background-color: #bdc3c7;
      }
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: none;

      :hover {
        background-color: #ecf0f1;
      }
    }

    .th {
      background-color: #2ecc71;
      user-select: none;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: none;
      overflow: hidden;

      ${
        '' /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        border-right: solid black 1px;
        right: 0;
        background: transparent;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;

        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          border-right: solid black 2px;
        }
      }
    }
  }
`;