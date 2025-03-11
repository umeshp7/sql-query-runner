import healthData from '../assets/data/health-data.json';
import userData from '../assets/data/user-data.json';
import postData from '../assets/data/post-data.json';

export default function getQueryData(query) {
  const queryDataMap = {
    'SELECT * FROM table;': healthData,
    'SELECT * FROM table WHERE column = value;': userData,
    'SELECT column1, column2 FROM table WHERE column = value;': postData,
  };

  return queryDataMap[query];
}
