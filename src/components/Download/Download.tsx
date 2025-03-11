import React from 'react';
import { Button } from '@mui/material';

interface DownloadCSVButtonProps {
  jsonData: Record<string, any>[];
  filename?: string;
}

const DownloadCSVButton:
React.FC<DownloadCSVButtonProps> = ({ jsonData, filename = 'data.csv' }) => {
  const convertToCSV = (data: Record<string, any>[]): string => {
    if (!data || data.length === 0) return '';

    const keys = Object.keys(data[0]);
    const csvRows: string[] = [];

    csvRows.push(keys.join(','));

    data.forEach(row => {
      const values = keys.map(key => {
        const value = row[key];
        return typeof value === 'string' ?
          `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  };

  const downloadCSV = (): void => {
    const csvData = convertToCSV(jsonData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      size='small'
      style={{
        height: '40px',
        marginTop: '4px',
        marginRight: '8px'
      }}
      variant="outlined"
      color="primary"
      onClick={downloadCSV}>
        Download CSV
    </Button>
  );
};

export default DownloadCSVButton;
