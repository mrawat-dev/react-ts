import React from "react";
import { useTable, useFilters } from "react-table";
import Table from 'react-bootstrap/Table';

export default  function DealTable ({ columns, data }) {

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      defaultColumn,
    },
    useFilters
  );

  

  function DefaultColumnFilter({
    column: { filterValue, setFilter },
  }) {
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Search records...`}
      />
    )
  }

  return (
    <Table  striped bordered hover {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              
             <th {...column.getHeaderProps()}>
                {column.render('Header')}
                {/* Render the columns filter UI */}
                <div>{column.filer ? column.render('Filter') : null}</div>
            </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
}