import React, { JSX, memo } from 'react';
import './Queries.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';


import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ListItem } from '@mui/material';

type QueriesProps = {
  selectQuery?: (query: string) => void;
  queries: string[];
  history: string[];
};

function Queries ({
  selectQuery,
  queries,
  history
} : QueriesProps) : JSX.Element {
  const [activeTab, setActiveTab] = React.useState('save');
  const handleSelect = (query: string) => {
    selectQuery && selectQuery(query || '');
  };

  return (
    <div className='queries'>
      <Tabs
        variant='fullWidth'
        value={activeTab}
        onChange={(e, value) => setActiveTab(value)}
      >
        <Tab label='Saved' value='save' />
        <Tab label='History' value='history' />
      </Tabs>
      {/* @todo reorganize */}
      {activeTab === 'save' ? (
        <div className='queries-list'>
          <List>
            {queries.map((query, index) => (
              <ListItem
                key={index}
                onClick={() => handleSelect(query)}
              >
                <CodeMirror
                  value={query}
                  style={{ cursor: 'pointer' }}
                  editable={false}
                  extensions={[sql(), EditorView.lineWrapping]}
                  hidden={false}
                  width='100%'
                  height='100%'
                  basicSetup={{
                    lineNumbers: false
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      ) : (
        <div className='queries-list'>
          <List>
            {history.map((query, index) => (
              <ListItem
                key={index}
                onClick={() => handleSelect(query)}
              >
                <CodeMirror
                  style={{ cursor: 'pointer' }}
                  value={query}
                  editable={false}
                  extensions={[sql(), EditorView.lineWrapping]}
                  hidden={false}
                  basicSetup={{
                    lineNumbers: false
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}

export default memo(Queries);
