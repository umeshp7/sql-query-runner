import React, { memo, useCallback, useState } from 'react';

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

type DataObject = {
  [key: string]: string | number | boolean | null;
};

function Workbench () {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentQuery, setCurrentQuery] = useState(defaultCode);
  const [data, setData] = useState<DataObject[] | null>(null);
  const [queryList, setQueryList] = useState<string[]>([
    ...Object.values(defaultQueries)
  ]);

  const [historyList, setHistoryList] = useState<string[]>([]);

  const handleAction = useCallback(
    (action: 'run' | 'save') => {
      const query = currentQuery.trim();

      if (query === '') {
        // show modal
        return;
      }

      switch (action) {
      case 'run': {
        const data = getQueryData(currentQuery);
        if (data) {
          setData(data);
        }
        else {
          setSnackbarMessage('Choose a query to run.');
          setOpen(true);
        }
        setHistoryList([currentQuery, ...historyList]);
        break;
      }
      case 'save': {
        const newQueryList = [...queryList, currentQuery];
        setQueryList(newQueryList);
        setSnackbarMessage('Query saved.');
        setOpen(true);
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
          style={{height: '-webkit-fill-available'}}>
          <Panel defaultSize={80} minSize={30}>
            <QueryEditor
              query={currentQuery}
              handleAction={handleAction}
              setQuery={debounce(setCurrentQuery, 500)}
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
        <Result data={data} />
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
