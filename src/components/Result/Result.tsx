// Code for Result component
import React, { memo, useState } from 'react';
import Table from '@mui/material/Table';
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import './Result.css';
import { Panel, PanelGroup } from 'react-resizable-panels';

import Visualisation from './Visualisation/Visualisation';

function TableView({ data }: { data: Array<Record<string, any>> }) {
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
        borderTop:'1px solid #f0f0f0',
        overflow: 'auto'
      }}>
        <div>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, idx) => (
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

function EmptyState() {
  return (
    <div className='result-empty-state'>
      <Typography
        variant='h5'
        color='#d0d0d0'>
          Select a query and hit the RUN button
      </Typography>
    </div>
  );
}

function ViewResult({
  data
}: { data: Array<Record<string, unknown>> }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <div
      style={{
        height: '-webkit-fill-available',
        borderTop: '1px solid #dfdfdf',
        overflow: 'auto',
      }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="View Switch Tabs">
        <Tab label="Table" />
        <Tab label="Visualize" />
      </Tabs>
      {tabIndex === 0 ?
        <TableView data={data} /> :
        <Visualisation data={data} />}
    </div>
  );
}

function Result ({
  data
}: { data: Array<Record<string, unknown>> | null }) {
  return (
    <div
      style={{
        height: '-webkit-fill-available',
        borderTop: '1px solid #dfdfdf',
        overflow: 'auto',
      }}
    >
      {data === null ?
        <EmptyState /> :
        <ViewResult data={data}/>}
    </div>
  );
}

export default memo(Result);
