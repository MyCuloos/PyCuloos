import React from "react"
import { Typography } from "antd"
import {
  ScriptDefinition,
  PythonSettings,
  ScriptGroup,
} from "../../../../types/settings"
import ScriptShell from "../ScriptShell"

interface Props {
  group: ScriptGroup
  script: ScriptDefinition
  python: PythonSettings
}

export function ScriptRoot({ script, python, group }: Props) {
  const getArgs = (): string[] =>
    script.args
      ?.map(x => x.default?.toString() as string)
      .filter(x => x !== undefined) ?? []

  return (
    <div>
      <Typography.Title>{script.name}</Typography.Title>
      <Typography.Text>{script.path}</Typography.Text>
      <ScriptShell
        scriptName={script.path}
        scriptArgs={getArgs()}
        scriptPath={group.options.basePath}
        python={python}
      />
    </div>
  )
}
