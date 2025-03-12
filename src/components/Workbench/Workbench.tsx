import React, { memo } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import QueryEditor from '../QueryEditor/QueryEditor';
import Queries from '../Queries/Queries';
import Result from '../Result/Result';
import {
  WorkbenchProvider,
  useWorkbench
} from '../../context/WorkbenchContext';

function WorkbenchContent() {
  const {
    data,
    loading,
  } = useWorkbench();

  return (
    <PanelGroup direction="vertical" style={{ height: '100%' }}>
      <Panel defaultSize={40}>
        <PanelGroup
          direction="horizontal" style={{ height: '-webkit-fill-available' }}>
          <Panel defaultSize={80} minSize={30}>
            <QueryEditor />
          </Panel>
          <Panel defaultSize={40}>
            <Queries />
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle />
      <Panel minSize={40}>
        <Result data={data} loading={loading} />
      </Panel>
    </PanelGroup>
  );
}

function Workbench() {
  return (
    <WorkbenchProvider>
      <WorkbenchContent />
    </WorkbenchProvider>
  );
}

export default memo(Workbench);
