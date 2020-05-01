import { ArgDefinition } from "./scripts"

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
  options: ScriptGroupOptions
  scripts: ScriptDefinition[]
}

export interface ScriptDefinition {
  name: string
  path: string
  args: ArgDefinition[] | undefined
}

export interface ScriptGroupOptions {
  basePath: string
}

export interface WorkspaceDefinition {
  python: PythonSettings
  scriptGroups: ScriptGroup[]
}
