import React, { memo, useCallback, useState, useEffect } from 'react';

// external components
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// internal components
import QueryEditor from '../QueryEditor/QueryEditor';
import Queries from '../Queries/Queries';
import Result from '../Result/Result';

// utils
import { defaultQueries, getQueryData } from '../../utils/getQueryData';
import debounce from 'debounce';
import { Snackbar } from '@mui/material';

const defaultCode = `// Enter your SQL query here and press Ctrl+Enter to 
execute.`;
const historyQueriesKey = 'sql-history-queries';
const savedQueriesKey = 'sql-saved-queries';

type DataObject = {
  [key: string]: string | number | boolean | null;
};

function Workbench () {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentQuery, setCurrentQuery] = useState(defaultCode);
  const [data, setData] = useState<DataObject[] | null>(null);

  const [queryList, setQueryList] = useState<string[]>([
    ...Object.values(defaultQueries)
  ]);
  const [historyList, setHistoryList] = useState<string[]>([]);

  useEffect(() => {
    const savedQueries = JSON.parse(
      localStorage.getItem(savedQueriesKey) || '[]');
    setQueryList(prev => [...prev, ...savedQueries]);

    const historyQueries = JSON.parse(
      localStorage.getItem(historyQueriesKey) || '[]');
    setHistoryList(historyQueries);
  }, []);

  const handleAction = useCallback(
    (action: 'run' | 'save') => {
      const query = currentQuery.trim();

      if (query === '') {
        setSnackbarMessage('Choose a query to run from saved list.');
        setOpen(true);
        return;
      }

      switch (action) {
      case 'run': {
        const data = getQueryData(currentQuery);
        if (data) {
          setData(data);
        }
        else {
          setSnackbarMessage('Choose a query to run from saved list.');
          setData(null);
          setOpen(true);
        }
        setHistoryList([currentQuery, ...historyList]);
        localStorage.setItem(historyQueriesKey,
          JSON.stringify([currentQuery, ...historyList]));
        break;
      }
      case 'save': {
        const newQueryList = [...queryList, currentQuery];
        setQueryList(newQueryList);
        setSnackbarMessage('Query saved.');
        setOpen(true);
        localStorage.setItem(savedQueriesKey,
          JSON.stringify([...queryList, currentQuery].slice(3)));
        break;
      }
      default:
        break;
      }
    },
    [
      currentQuery,
      historyList,
      queryList,
      setData,
      setHistoryList,
      setQueryList
    ]
  );

  return (
    <PanelGroup direction='vertical' style={{height: '100%'}}>
      <Panel defaultSize={40}>
        <PanelGroup
          direction='horizontal'
          style={{ height: '-webkit-fill-available' }}>
          <Panel defaultSize={80} minSize={30}>
            <QueryEditor
              query={currentQuery}
              handleAction={handleAction}
              setQuery={debounce(setCurrentQuery, 500)}
              setLoading={setLoading}
            />
          </Panel>
          <Panel defaultSize={40}>
            <Queries
              selectQuery={setCurrentQuery}
              queries={queryList}
              history={historyList}
            />
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle />
      <Panel minSize={40}>
        <Result data={data} loading={loading}/>
      </Panel>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        message={snackbarMessage}
        onClose={() => setOpen(false)}
      />
    </PanelGroup>
  );
}

export default memo(Workbench);
