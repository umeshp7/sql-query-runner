import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Panel, PanelGroup } from 'react-resizable-panels';

import './TableView.css';

type Data = Array<Record<string, unknown>>;

function TableView({ data }: { data: Data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const visibleRows = React.useMemo(
    () =>
      [...data]
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, data],
  );

  return (
    <PanelGroup direction='vertical' className='result-table-container'>
      <Panel defaultSize={12} minSize={10}>
        <div style={{ display: 'flex'}}>
          <Typography
            style={{ alignContent: 'center', paddingLeft: '16px' }}
            color='textPrimary'
            variant='subtitle2'
          >
            Time taken: 0.1s
          </Typography>
          <TablePagination
            component='div'
            count={data.length}
            rowsPerPageOptions={[25, 50, 100]}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, pageNumber) => { setPage(pageNumber); }}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
            }}
          />
        </div>
      </Panel>
      <Panel defaultSize={90} style={{
        overflow: 'auto',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableCell
                    style={{fontWeight: 'bold'}}
                    key={key}>{key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={index}>
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
}

export default TableView;
