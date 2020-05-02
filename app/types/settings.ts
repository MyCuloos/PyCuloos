import { ArgDefinition } from "./scripts"

export type ScriptType = "python" | "terminal"
export type PythonExecutionMode = "text" | "json" | "binary"

export interface PythonInvocationParams {
  mode: PythonExecutionMode
  options: string[]
}

export interface PythonSettings {
  path: string
  defaultParams: PythonInvocationParams
}

export interface ScriptGroup {
  name: string
  type: ScriptType
  options: ScriptGroupOptions
  scripts: ScriptDefinition[]
}

export interface ScriptDefinition {
  name: string
  path: string
  args: ArgDefinition[] | undefined
}

export interface ScriptDefinitionDetails {
  group: ScriptGroup
  definition: ScriptDefinition
}

export interface ScriptGroupOptions {
  basePath: string
}

export interface WorkspaceDefinition {
  python: PythonSettings
  scriptGroups: ScriptGroup[]
}
