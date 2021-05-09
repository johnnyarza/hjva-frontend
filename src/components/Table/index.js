import React from 'react';
import {
  useFlexLayout,
  useResizeColumns,
  useRowSelect,
  useTable,
  useSortBy,
} from 'react-table';
import PropTypes from 'prop-types';

import { Container } from './styles';

const getStyles = (props) => [
  props,
  {
    style: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  },
];

const headerProps = (props, { column }) => getStyles(props, column.align);

const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 20, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    useRowSelect
  );
  return (
    <Container>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup) => (
            <div
              {...headerGroup.getHeaderGroupProps({
                // style: { paddingRight: '15px' },
              })}
              className="tr"
            >
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps(headerProps)} className="th">
                  <div>
                    <div
                      {...(!column.disableSort && !column.isResizing
                        ? column.getSortByToggleProps()
                        : {})}
                      className="header-content"
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>

                    {!column.disableResize && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tbody">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => {
                  return (
                    <div {...cell.getCellProps(cellProps)} className="td">
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Table;

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
