import { ScriptGroup, ScriptDefinition } from "./settings"
import { ScriptProcessor } from "./scripts"

export interface SelectedScriptItem {
  group: ScriptGroup
  definition: ScriptDefinition
  processor: ScriptProcessor
}
