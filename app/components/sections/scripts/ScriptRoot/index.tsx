import React from "react"
import { Typography, Collapse } from "antd"
import { RightOutlined } from "@ant-design/icons"
import ScriptArgsInput from "../ScriptArgsInput"
import { ScriptArgument } from "../../../../types/scripts"
import { SelectedScriptItem } from "../../../../types/ui"
import ScriptShell from "../ScriptShell"

interface Props {
  script: SelectedScriptItem
  onArgsChange: (values: ScriptArgument[]) => void
}

export function ScriptRoot({ script, onArgsChange }: Props) {
  return (
    <div className="fx-col fx-1">
      <div>
        {/* <Typography.Title>{script.definition.name}</Typography.Title> */}
        <Typography.Title level={3}>
          <strong>Script: </strong>
          <span style={{ fontWeight: "normal" }}>{script.definition.path}</span>
        </Typography.Title>
      </div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Collapse.Panel key="1" header="Params">
          <ScriptArgsInput values={script.arguments} onChange={onArgsChange} />
        </Collapse.Panel>
      </Collapse>

      <div className="fx-col fx-1" style={{ marginTop: 12 }}>
        <ScriptShell
          processor={script.processor}
          scriptArgs={script.arguments}
        />
      </div>
    </div>
  )
}
