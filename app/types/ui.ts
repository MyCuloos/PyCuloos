import { ScriptGroup, ScriptDefinition } from "./settings"
import { ScriptProcessor, ScriptArgument } from "./scripts"

export interface SelectedScriptItem {
  group: ScriptGroup
  definition: ScriptDefinition
  processor: ScriptProcessor
  arguments: ScriptArgument[]
}
