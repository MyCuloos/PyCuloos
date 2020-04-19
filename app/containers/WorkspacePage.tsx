import React from 'react';
import WorkspaceInitializer from '../components/sections/workspace/WorkspaceInitializer';
import { WorkspaceContext } from '../context/workspace/workspaceContext';
import WorkspaceRoot from '../components/sections/workspace/WorkspaceRoot';

export default function WorkspacePage() {
  return (
    <WorkspaceInitializer>
      <WorkspaceContext.Consumer>
        {context => (
          <>
            {context.definition ? (
              <WorkspaceRoot definition={context.definition} />
            ) : (
              <div>LOAD ERROR</div>
            )}
          </>
        )}
      </WorkspaceContext.Consumer>
    </WorkspaceInitializer>
  );
}
