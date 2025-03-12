import React, { memo, useContext, useState } from 'react';

import './QueryEditor.css';

import Button from '@mui/material/Button';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { useWorkbench } from '../../context/WorkbenchContext';
import debounce from 'debounce';

/**
 * Code editor component and actions on query
 *
 * @param
 * @returns
 */
function QueryEditor() {
  const [isRunning, setIsRunning] = useState(false);
  const [stopped, setIsStopped] = useState(false);
  const {
    handleAction,
    setCurrentQuery,
    setLoading,
    currentQuery
  } = useWorkbench();

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
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [isRunning, stopped]);

  return (
    <div className='query'>
      <div className='query-editor'>
        <CodeMirror
          height='100%'
          className='codemirror-editor'
          value={currentQuery}
          onChange={debounce(setCurrentQuery, 500)}
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
