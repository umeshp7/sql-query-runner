import React, { useEffect, useState } from 'react';

// external
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// internal
import DataPieChart from './DataPieChart';
import DataBarChart from './DataBarChart';

import './Visualisation.css';

const supportedKeys: Record<string, string[]> = {
  'student_id': ['subjects', 'location'],
  'customer_id' :['plan', 'membership_status'],
  'user_id': ['gender']
};

const VisualisationBox:
  React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className='visualisation-box'>
      {children}
    </div>;
  };

function getSupportedKeysArray<T extends Record<string, any>>(
  obj: T,
): string[] {
  const foundKey = Object.keys(supportedKeys).find(key => key in obj);
  return foundKey ? supportedKeys[foundKey] : [];
}

type VisualisationProps = {
  data: any[];
};

const Visualisation: React.FC<VisualisationProps> = ({
  data
}) => {
  /**
   * This logic is meant only for the demo purpose.
   * In real world this will be done through user inputs.
   */
  const columns = getSupportedKeysArray(data[0]);
  const [column, setColumn] = useState(columns[0]);

  useEffect(() => {
    setColumn(columns[0]);
  }, [columns]);

  return (
    <div className='visualisation'>
      <div className='visualisation-dropdown'>
        <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
          <InputLabel>Column</InputLabel>
          <Select
            value={column}
            label="Column"
            onChange={(e) => { setColumn(e.target.value); }}
            defaultValue={columns[0]}
          >
            {columns.map((column) => {
              return <MenuItem key={column} value={column}>{column}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className='visualisation-charts'>
        <VisualisationBox>
          <DataPieChart data={data} columnName={column}/>
        </VisualisationBox>
        <VisualisationBox>
          <DataBarChart data={data} categoryKey={column} valueKey='count'/>
        </VisualisationBox>
      </div>
    </div>
  );
};

export default Visualisation;
