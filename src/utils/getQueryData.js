import healthData from '../assets/data/health-data.json';
import userData from '../assets/data/user-data.json';
import postData from '../assets/data/post-data.json';

export const defaultQueries = {
  query1: 'SELECT * FROM table;',
  query2: 'SELECT * FROM table WHERE column = value;',
  query3: 'SELECT column1, column2 FROM table WHERE column = value;'
};

export function getQueryData(query) {
  const queryDataMap = {
    'SELECT * FROM table;': healthData,
    'SELECT * FROM table WHERE column = value;': userData,
    'SELECT column1, column2 FROM table WHERE column = value;': postData,
  };

  return queryDataMap[query];
}
