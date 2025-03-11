import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Typography,
} from '@mui/material';
import { PanelGroup, Panel } from 'react-resizable-panels';

import DownloadCSVButton from '../../Download/Download';

import './TableView.css';

type Data = Array<Record<string, unknown>>;


const TableView = ({ data }: { data: Data }) => {
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleSort = (column: any) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a: any, b: any) => {
      if (!orderBy) return 0;
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, orderBy, order]);

  const visibleRows = useMemo(() => {
    return sortedData.slice(page *
      rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, sortedData]);

  return (
    <PanelGroup direction="vertical" className="result-table-container">
      <Panel defaultSize={12} minSize={10}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <Typography
              style={{ alignContent: 'center', paddingLeft: '16px' }}
              color="textPrimary"
              variant="subtitle2"
            >
              Time taken: 0.1s
            </Typography>
            <TablePagination
              component="div"
              count={data.length}
              rowsPerPageOptions={[25, 50, 100]}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, pageNumber) => {
                setPage(pageNumber);
              }}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </div>
          <DownloadCSVButton jsonData={data} />
        </div>
      </Panel>
      <Panel
        defaultSize={90}
        style={{
          overflow: 'auto',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <div>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableCell key={key} style={{ fontWeight: 'bold' }}>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? order : 'asc'}
                      onClick={() => handleSort(key)}
                    >
                      {key}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={index}>
                  {/* eslint-disable-next-line */}
                  {Object.values(row).map((value: any, idx) => (
                    <TableCell key={idx}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default TableView;
