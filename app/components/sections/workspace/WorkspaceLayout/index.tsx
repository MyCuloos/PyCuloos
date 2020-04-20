import React from "react"
import { Layout } from "antd"
import WorkspaceSidebar from "../WorkspaceSidebar"
import { WorkspaceBreadcrumb } from "../WorkspaceBreadcrumb"
import {
  WorkspaceDefinition,
  ScriptDefinition,
  ScriptGroup,
} from "../../../../types/settings"
import { ScriptRoot } from "../../scripts/ScriptRoot"

interface Params {
  definition: WorkspaceDefinition
}

interface SelectedScript {
  group: ScriptGroup
  script: ScriptDefinition
}

export default function WorkspaceLayout({ definition }: Params) {
  const [script, setScript] = React.useState<SelectedScript | undefined>()
  React.useEffect(() => {
    setScript({
      group: definition.scriptGroups[0],
      script: definition.scriptGroups[0].scripts[0],
    })
  }, [])
  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider width={200}>
        <WorkspaceSidebar
          scriptGroups={definition.scriptGroups}
          onScriptSelected={x => setScript(x)}
        />
      </Layout.Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <WorkspaceBreadcrumb />
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
          }}
        >
          {script ? (
            <ScriptRoot
              script={script.script}
              group={script.group}
              python={definition.python}
            />
          ) : (
            undefined
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
