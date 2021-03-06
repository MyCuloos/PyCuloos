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
  index: number
  definition: ArgDefinition
  value: ArgValue
}

export type OutputLevel = "info" | "error"

export interface ScriptOutputLine {
  timestamp: Date
  level: OutputLevel
  message: string
}

export interface ScriptError {
  message: string
  stackTrace: string | undefined
}

export interface ScriptProcessor {
  start(
    args: ScriptArgument[],
    onDataReceived: (data: any) => void,
    onCompleted: (data: any) => void,
    onError: (error: ScriptError) => void
  ): void
  stop(): void
  readScript(onLoaded: (content: string) => void): void
  updateScript(content: string): void
}
