export type ArgType = "string" | "int" | "decimal" | "filepath"
export type ArgValue = string | number | undefined

export interface ArgOption {
  value: ArgValue
  label: string
}

export interface ArgValidator {
  type: string
  params: any
}

export interface ArgOptions {
  values: ArgOption[]
}

export interface ArgDefinition {
  name: string
  type: ArgType
  default: ArgValue
  options: ArgOption[] | undefined
  editable: boolean | undefined
  validators: ArgValidator[] | undefined
  parameterName: string | undefined
}

export interface ScriptArgument {
  definition: ArgDefinition
  value: ArgValue
}
