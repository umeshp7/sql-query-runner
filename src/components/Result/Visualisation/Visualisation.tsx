import React, { useEffect, useState } from 'react';
import DataPieChart from './DataPieChart';
import DataBarChart from './DataBarChart';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const supportedKeys: Record<string, string[]> = {
  'student_id': ['subjects', 'location'],
  'customer_id' :['plan', 'membership_status'],
  'user_id': ['gender']
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
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
      }}
      >
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
      <div
        style={{
          display: 'flex'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '50%',
            borderRight: '1px solid #dfdfdf',
            borderTop: '1px solid #dfdfdf',
            borderBottom: '1px solid #dfdfdf'
          }}
        >
          <DataPieChart data={data} columnName={column}/>
        </div>
        <div
          style={{
            display: 'flex',
            width: '50%',
            borderRight: '1px solid #dfdfdf',
            borderTop: '1px solid #dfdfdf',
            borderBottom: '1px solid #dfdfdf'
          }}
        >
          <DataBarChart data={data} categoryKey={column} valueKey='count'/>
        </div>
      </div>
    </div>
  );
};

export default Visualisation;
