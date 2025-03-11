import React from 'react';
import { PieChart } from '@mui/x-charts';

type DataPieChartProps = {
  data: any[];
  columnName: string;
};

const DataPieChart: React.FC<DataPieChartProps> = ({
  data, columnName
}) => {
  // Process data to count occurrences of each value in the specified column
  const countOccurrences = (data: any[], column: string):
    Record<string, number> => {
    return data.reduce((acc: Record<string, number>, item) => {
      const key = String(item[column]);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const processedData = countOccurrences(data, columnName);
  const pieChartData = Object.keys(processedData).map((key, index) => ({
    id: index,
    value: processedData[key],
    label: key,
  }));

  return (
    <PieChart
      series={[{ data: pieChartData }]}
      width={700}
      height={300}
    />
  );
};

export default DataPieChart;
