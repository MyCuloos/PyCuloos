import React from "react"
import { Typography } from "antd"
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
    <div>
      <div>
        <Typography.Title>{script.definition.name}</Typography.Title>
        <Typography.Title level={3}>
          <strong>Script: </strong>
          <span style={{ fontWeight: "normal" }}>{script.definition.path}</span>
        </Typography.Title>
      </div>
      <ScriptArgsInput values={script.arguments} onChange={onArgsChange} />
      <ScriptShell processor={script.processor} scriptArgs={script.arguments} />
    </div>
  )
}
