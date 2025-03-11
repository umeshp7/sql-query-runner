import React, { JSX, memo, useState } from 'react';
import './Queries.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';

import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';

type QueriesProps = {
  selectQuery?: (query: string) => void;
  queries: string[];
  history: string[];
};

function Queries({ selectQuery, queries, history }: QueriesProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('save');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (query: string) => {
    selectQuery && selectQuery(query || '');
  };

  const filteredQueries =
  (activeTab === 'save' ? queries : history).filter(query =>
    query.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <TextField
        size='small'
        fullWidth
        variant='outlined'
        placeholder='Search queries...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '8px 0' }}
      />

      <div className='queries-list'>
        <List>
          {filteredQueries.map((query, index) => (
            <ListItem key={index} onClick={() => handleSelect(query)}>
              <CodeMirror
                value={query}
                style={{ cursor: 'pointer' }}
                editable={false}
                extensions={[sql(), EditorView.lineWrapping]}
                hidden={false}
                width='100%'
                height='100%'
                basicSetup={{ lineNumbers: false }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default memo(Queries);
