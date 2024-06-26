import { Box, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { TableProps, HeaderGroup, Row, Cell } from "react-table";

interface KpiTableProps {
  getTableProps: () => TableProps;
  getTableBodyProps: () => any;
  headerGroups: HeaderGroup<any>[];
  rows: Row<any>[];
  prepareRow: (row: any) => void;
}


const KpiTable = ({ getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }: KpiTableProps) => (
  <Box maxW="100%" overflowX="auto">
    <TableContainer>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={`${headerGroup.id}-${index}`}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
);

export default KpiTable;
