import React from "react"
import { Layout } from "antd"
import WorkspaceSidebar from "../WorkspaceSidebar"
import {
  WorkspaceDefinition,
  ScriptDefinition,
  ScriptGroup,
} from "../../../../types/settings"
import { ScriptRoot } from "../../scripts/ScriptRoot"
import ScriptContext from "../../../../context/script/scriptContext"

interface Params {
  definition: WorkspaceDefinition
}

export default function WorkspaceLayout({ definition }: Params) {
  const script = React.useContext(ScriptContext)

  const setCurrentScript = (
    group: ScriptGroup,
    scriptDefinition: ScriptDefinition
  ) => {
    script.selectScript({
      group,
      definition: scriptDefinition,
    })
  }

  React.useEffect(() => {
    setCurrentScript(
      definition.scriptGroups[0],
      definition.scriptGroups[0].scripts[0]
    )
  }, [])

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider width={200}>
        <WorkspaceSidebar
          scriptGroups={definition.scriptGroups}
          onScriptSelected={x => setCurrentScript(x.group, x.script)}
        />
      </Layout.Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {script.definition ? <ScriptRoot /> : undefined}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
