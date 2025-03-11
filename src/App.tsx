import { JSX } from 'react';

// external
import { PanelGroup, Panel } from 'react-resizable-panels';

// internal components
import Workbench from './components/Workbench/Workbench';
import Typography from '@mui/material/Typography';
import Sidebar from './components/Sidebar/Sidebar';

/**
 * Base App
 */
function App() : JSX.Element {
  return (
    <PanelGroup direction='vertical' style={{height: '100vh'}}>
      <Panel defaultSize={8}
        style={{
          paddingLeft: '16px',
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
            <Sidebar />
          </Panel>
          <Panel minSize={40}>
            <Workbench />
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}

export default App;
