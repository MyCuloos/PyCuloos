export type PythonExecutionMode = 'text' | 'json' | 'binary';

export interface PythonInvocationParams {
  mode: PythonExecutionMode;
  options: string[];
}

export interface PythonSettings {
  path: string;
  defaultParams: PythonInvocationParams;
}

export interface ScriptGroup {
  name: string;
  options: ScriptGroupOptions;
  scripts: ScriptDefinition[];
}

export interface ScriptDefinition {
  name: string;
  path: string;
  args: ScriptArg[] | undefined;
}

export type ArgType = 'string' | 'number' | 'filepath';
export type ArgValueType = string | number;

export interface ArgOption {
  value: ArgValueType;
  label: string;
}

export interface ArgValidator {
  type: string;
  params: any;
}

export interface ArgOptions {
  values: ArgOption[];
}

export interface ScriptArg {
  name: string;
  type: ArgType;
  default: ArgValueType | undefined;
  options: ArgOption[] | undefined;
  editable: boolean | undefined;
  validators: ArgValidator[] | undefined;
}

export interface ScriptGroupOptions {
  basePath: string;
}

export interface WorkspaceDefinition {
  python: PythonSettings;
  scriptGroups: ScriptGroup[];
}
