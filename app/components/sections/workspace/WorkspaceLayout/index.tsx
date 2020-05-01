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
import { initScript } from "../../../../services/scripts/scriptInitializer"
import { SelectedScriptItem } from "../../../../types/ui"
import { ScriptArgument } from "../../../../types/scripts"

interface Params {
  definition: WorkspaceDefinition
}

export default function WorkspaceLayout({ definition }: Params) {
  const [script, setScript] = React.useState<SelectedScriptItem | undefined>()

  const setCurrentScript = (
    group: ScriptGroup,
    scriptDefinition: ScriptDefinition
  ) => {
    setScript(initScript(group, scriptDefinition, definition))
  }

  React.useEffect(() => {
    setCurrentScript(
      definition.scriptGroups[0],
      definition.scriptGroups[0].scripts[0]
    )
  }, [])

  const handleArgsUpdate = (values: ScriptArgument[]) => {
    setScript({
      ...(script as SelectedScriptItem),
      arguments: values,
    })
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider width={200}>
        <WorkspaceSidebar
          scriptGroups={definition.scriptGroups}
          onScriptSelected={x => setCurrentScript(x.group, x.script)}
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
            <ScriptRoot script={script} onArgsChange={handleArgsUpdate} />
          ) : (
            undefined
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
