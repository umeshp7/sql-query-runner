import React, { memo, useState } from 'react';

import './QueryEditor.css';

import Button from '@mui/material/Button';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';

type WorkbenchProps = {
  handleAction: (action: 'run' | 'save') => void;
  query: string;
  setQuery: (query: string) => void;
};

function Workbench({
  handleAction,
  query,
  setQuery,
}: WorkbenchProps) {
  return (
    <div className='workbench'>
      <div className='workbench-editor'>
        <CodeMirror
          height='100%'
          className='codemirror-editor'
          value={query}
          onChange={(value) => {
            setQuery(value);
            return;
          }}
          extensions={[sql(), EditorView.lineWrapping]}
          maxWidth='100%'
        />
      </div>
      <div className='workbench-actions'>
        <Button
          size='medium'
          variant='outlined'
          color='primary'
          onClick={() => handleAction('save')}>
            SAVE
        </Button>
        <Button
          size='medium'
          variant='outlined'
          color='success'
          onClick={() => handleAction('run')}>RUN</Button>
      </div>
    </div>
  );
}

export default memo(Workbench);
