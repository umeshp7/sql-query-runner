import React, { memo, useState } from 'react';

import './QueryEditor.css';

import Button from '@mui/material/Button';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';

interface QueryEditorProps {
  handleAction: (action: 'run' | 'save') => void;
  query: string;
  setQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
}

function QueryEditor({
  handleAction,
  query,
  setQuery,
  setLoading,
}: QueryEditorProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [stopped, setIsStopped] = useState(false);

  const handleStop = () => {
    setIsStopped(true);
    setIsRunning(false);
    setLoading(false);
  };

  const handleRunClick = () => {
    setIsRunning(true);
    setIsStopped(false);
    setLoading(true);
  };

  React.useEffect(() => {
    if (isRunning && !stopped) {
      const timer = setTimeout(() => {
        handleAction('run');
        setIsRunning(false);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isRunning, stopped]);

  return (
    <div className='query'>
      <div className='query-editor'>
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
      <div className='query-actions'>
        <Button
          size='medium'
          variant='outlined'
          color='primary'
          onClick={() => handleAction('save')}>
            SAVE
        </Button>
        {isRunning ?
          <Button
            size='medium'
            variant='outlined'
            color='error'
            onClick={handleStop}>
          STOP RUN
          </Button> :
          <Button
            size='medium'
            variant='outlined'
            color='success'
            disabled={isRunning}
            onClick={handleRunClick}>
            RUN
          </Button>}
      </div>
    </div>
  );
}

export default memo(QueryEditor);
