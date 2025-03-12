import React, { JSX, memo, useState } from 'react';
import './Queries.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';

import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { useWorkbench } from '../../context/WorkbenchContext';


/**
 * Queries Section with 2 tabs Saved and History
 *
 * @returns JSX.Element
 */
function Queries(): JSX.Element {
  const [activeTab, setActiveTab] = useState('save');
  const [searchTerm, setSearchTerm] = useState('');
  const { setCurrentQuery, historyList, queryList } = useWorkbench();

  const handleSelect = (query: string) => {
    setCurrentQuery && setCurrentQuery(query || '');
  };

  const filteredQueries =
  (activeTab === 'save' ? queryList : historyList).filter(query =>
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
