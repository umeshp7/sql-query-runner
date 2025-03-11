// Code for Result component
import React, { memo, useState } from 'react';
import {
  Typography,
} from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import './Result.css';

import Visualisation from './Visualisation/Visualisation';
import TableView from './Table/TableView';

type Data = Array<Record<string, unknown>>;
interface ResultProps { data: Data | null }

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
}: { data: Data }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <div className='result-tabs'>
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

const Result: React.FC<ResultProps> = ({ data }) => {
  return (
    <div className='result-section'>
      {data === null ?
        <EmptyState /> :
        <ViewResult data={data}/>}
    </div>
  );
};

export default memo(Result);
