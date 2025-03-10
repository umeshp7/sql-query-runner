import React, { memo, useState } from 'react';

// external components
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// internal components
import QueryEditor from '../QueryEditor/QueryEditor';
import Queries from '../Queries/Queries';
import Result from '../Result/Result';

// utils
import getQueryData from '../../utils/getQueryData';

const defaultCode = `// Enter your SQL query here and press Ctrl+Enter to 
execute.`;

function Workbench () {
  const [currentQuery, setCurrentQuery] = useState(defaultCode);
  const [data, setData] = useState<any[] | null>(null);

  const [queryList, setQueryList] = useState<string[]>([
    'SELECT * FROM table;',
    'SELECT * FROM table WHERE column = value;',
    'SELECT column1, column2 FROM table WHERE column = value;',
  ]);

  const [historyList, setHistoryList] = useState<string[]>([]);
  const handleAction = (action: string) => {
    switch (action) {
    case 'run': {
      const data = getQueryData(currentQuery);
      if (data) {
        setData(data);
      }
      setHistoryList([currentQuery, ...historyList]);
    }
      break;
    case 'save': {
      const newQueryList = [...queryList, currentQuery];

      setQueryList(newQueryList);
    }
      break;
    default:
      break;
    }
  };

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
              setQuery={setCurrentQuery}
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
        <Result data={data}/>
      </Panel>
    </PanelGroup>
  );
}

export default memo(Workbench);
