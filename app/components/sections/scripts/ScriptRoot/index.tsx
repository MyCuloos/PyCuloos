import React from "react"
import { Typography } from "antd"
import {
  ScriptDefinition,
  PythonSettings,
  ScriptGroup,
} from "../../../../types/settings"
import ScriptShell from "../ScriptShell"
import ScriptArgsInput from "../ScriptArgsInput"
import { ScriptArgument } from "../../../../types/scripts"
import { buildArgsStrings } from "../../../../converters/argsConverter"

interface Props {
  group: ScriptGroup
  script: ScriptDefinition
  python: PythonSettings
}

export function ScriptRoot({ script, python, group }: Props) {
  const [argValues, setArgValues] = React.useState<ScriptArgument[]>([])
  const getArgs = (): string[] => buildArgsStrings(argValues)

  return (
    <div>
      <div>
        <Typography.Title>{script.name}</Typography.Title>
        <Typography.Title level={3}>
          <strong>Script: </strong>
          <span style={{ fontWeight: "normal" }}>{script.path}</span>
        </Typography.Title>
      </div>
      {script.args ? (
        <ScriptArgsInput args={script.args} onChange={setArgValues} />
      ) : (
        undefined
      )}
      <ScriptShell
        scriptName={script.path}
        scriptArgs={getArgs()}
        scriptPath={group.options.basePath}
        python={python}
      />
    </div>
  )
}
