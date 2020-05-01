import React from "react"
import { Typography } from "antd"
import ScriptArgsInput from "../ScriptArgsInput"
import { ScriptArgument } from "../../../../types/scripts"
import { SelectedScriptItem } from "../../../../types/ui"
import ScriptShell from "../ScriptShell"

interface Props {
  script: SelectedScriptItem
}

export function ScriptRoot({ script }: Props) {
  const [argValues, setArgValues] = React.useState<ScriptArgument[]>([])

  return (
    <div>
      <div>
        <Typography.Title>{script.definition.name}</Typography.Title>
        <Typography.Title level={3}>
          <strong>Script: </strong>
          <span style={{ fontWeight: "normal" }}>{script.definition.path}</span>
        </Typography.Title>
      </div>
      {script.definition.args ? (
        <ScriptArgsInput
          args={script.definition.args}
          onChange={setArgValues}
        />
      ) : (
        undefined
      )}
      <ScriptShell processor={script.processor} scriptArgs={argValues} />
    </div>
  )
}
