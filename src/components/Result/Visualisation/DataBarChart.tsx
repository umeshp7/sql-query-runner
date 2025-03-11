import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface DataItem {
  [key: string]: string | number;
}

interface BarChartProps {
  data: DataItem[];
  categoryKey: string;
  valueKey: string;
}

const processData = (
  data: DataItem[],
  categoryKey: string,
  valueKey: string) => {
  const countMap: Record<string, number> = {};
  data.forEach((item) => {
    const category = item[categoryKey] as string;
    countMap[category] = (countMap[category] || 0) + 1;
  });
  return Object.entries(countMap).map(([category, count]) => ({
    [categoryKey]: category,
    [valueKey]: count,
  }));
};

const DataBarChart:React.FC<BarChartProps> =
  ({ data, categoryKey, valueKey }) => {
    const chartData = processData(data, categoryKey, valueKey);

    return (
      <BarChart
        dataset={chartData}
        xAxis={[{ scaleType: 'band', dataKey: categoryKey }]}
        series={[{ dataKey: valueKey, label: `${valueKey} Count` }]}
        width={1000}
        height={300}
      />
    );
  };

export default DataBarChart;
