import {
  ScriptGroup,
  ScriptDefinition,
  WorkspaceDefinition,
} from "../../types/settings"
import { SelectedScriptItem } from "../../types/ui"
import { PythonScriptProcessor } from "../../processors/pythonScriptProcessor"
import { initArgumanets } from "../../converters/argsConverter"
import { TerminalScriptProcessor } from "../../processors/terminalScriptProcessor"

const createProcessor = (
  group: ScriptGroup,
  definition: ScriptDefinition,
  workspace: WorkspaceDefinition
) => {
  switch (group.type) {
    case "python":
      return new PythonScriptProcessor(
        group.options.basePath,
        definition.path,
        workspace.python
      )
    case "terminal":
      return new TerminalScriptProcessor(
        group.options.basePath,
        definition.path
      )
    default:
      throw new Error("Not implemented")
  }
}

export const initScript = (
  group: ScriptGroup,
  script: ScriptDefinition,
  workspace: WorkspaceDefinition
): SelectedScriptItem => ({
  group,
  definition: script,
  processor: createProcessor(group, script, workspace),
  arguments: initArgumanets(script.args ?? []),
})
