import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';

import { defaultQueries, getQueryData } from '../utils/getQueryData';
import Snackbar from '@mui/material/Snackbar';

const defaultCode = `// Enter your SQL query here and press Ctrl+Enter to'
execute.`;
const historyQueriesKey = 'sql-history-queries';
const savedQueriesKey = 'sql-saved-queries';

type DataObject = {
  [key: string]: string | number | boolean | null;
};

interface WorkbenchContextProps {
  currentQuery: string;
  setCurrentQuery: (query: string) => void;
  data: DataObject[] | null;
  loading: boolean;
  queryList: string[];
  historyList: string[];
  handleAction: (action: 'run' | 'save') => void;
  setLoading: (loading: boolean) => void
}

const WorkbenchContext = createContext<
  WorkbenchContextProps | undefined>(undefined);

export const WorkbenchProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentQuery, setCurrentQuery] = useState(defaultCode);
  const [data, setData] = useState<DataObject[] | null>(null);

  const [queryList, setQueryList] =
  useState<string[]>([...Object.values(defaultQueries)]);
  const [historyList, setHistoryList] = useState<string[]>([]);

  useEffect(() => {
    const savedQueries =
    JSON.parse(localStorage.getItem(savedQueriesKey) || '[]');
    setQueryList(prev => [...prev, ...savedQueries]);

    const historyQueries =
    JSON.parse(localStorage.getItem(historyQueriesKey) || '[]');
    setHistoryList(historyQueries);
  }, []);

  const handleAction = useCallback(
    (action: 'run' | 'save') => {
      const query = currentQuery.trim();

      if (query === '' && action === 'run') {
        setSnackbarMessage('Choose a query to run from saved list.');
        setOpen(true);
        return;
      }

      if (query === '' && action === 'save') {
        setSnackbarMessage('Please enter a query to save');
        setOpen(true);
        return;
      }

      switch (action) {
      case 'run': {
        const result = getQueryData(currentQuery);
        setData(result ?? null);

        if (!result) {
          setSnackbarMessage('Choose a query to run from saved list.');
          setOpen(true);
        }

        const updatedHistory = [currentQuery, ...historyList];
        setHistoryList(updatedHistory);
        localStorage.setItem(historyQueriesKey, JSON.stringify(updatedHistory));
        break;
      }
      case 'save': {
        const newQueryList = [...queryList, currentQuery];
        setQueryList(newQueryList);
        setSnackbarMessage('Query saved.');
        setOpen(true);
        localStorage.setItem(
          savedQueriesKey, JSON.stringify(newQueryList.slice(3))
        );
        break;
      }
      }
    },
    [currentQuery, historyList, queryList]
  );

  return (
    <WorkbenchContext.Provider
      value={{
        currentQuery,
        setCurrentQuery,
        data,
        loading,
        queryList,
        historyList,
        handleAction,
        setLoading
      }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2500}
        message={snackbarMessage}
        onClose={() => setOpen(false)}
      />
    </WorkbenchContext.Provider>
  );
};

export const useWorkbench = (): WorkbenchContextProps => {
  const context = useContext(WorkbenchContext);
  if (!context) {
    throw new Error('useWorkbench must be used within a WorkbenchProvider');
  }
  return context;
};
