import { JSX } from 'react';
import './App.css';
import { PanelGroup, Panel } from 'react-resizable-panels';

import Typography from '@mui/material/Typography';

/**
 * Base App
 */
function App() : JSX.Element {
  return (
    <PanelGroup direction='vertical' style={{height: '100vh'}}>
      <Panel defaultSize={8}
        style={
          {paddingLeft: '16px',
            height: '100%',
            display: 'flex', alignItems: 'center'
          }}>
        <Typography
          color='info'
          fontWeight='bold'
          variant='h6'>
            SQL Query Runner
        </Typography>
      </Panel>
      <Panel defaultSize={92}>
        <PanelGroup direction='horizontal'>
          <Panel defaultSize={20} minSize={10}>
            <div style={{
              height: '-webkit-fill-available',
              padding: '4px',
              borderRight: '1px solid #dfdfdf',
              borderTop: '1px solid #dfdfdf',
            }}>
              <div>Sidebar</div>
            </div>
          </Panel>
          <Panel minSize={40}>
            <div>Workbench</div>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}

export default App;
