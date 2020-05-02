import React from "react"
import {
  ScriptDefinitionDetails,
  WorkspaceDefinition,
} from "../../types/settings"
import {
  ScriptProcessor,
  ScriptArgument,
  ScriptOutputLine,
} from "../../types/scripts"
import { createProcessor } from "../../services/scripts/scriptInitializer"
import { initArgumanets } from "../../converters/argsConverter"

interface ScriptContextData {
  definition: ScriptDefinitionDetails | undefined
  processor: ScriptProcessor | undefined
  args: ScriptArgument[]
  output: ScriptOutputLine[]
  selectScript(value: ScriptDefinitionDetails): void
  deselectScript(): void
  updateArgument(argument: ScriptArgument): void
  appendOutput(line: ScriptOutputLine): void
  setOutput(lines: ScriptOutputLine[]): void
  clearOutput(): void
}

const ScriptContext = React.createContext<ScriptContextData>({
  definition: undefined,
  processor: undefined,
  args: [],
  output: [],
  selectScript: () => {},
  deselectScript: () => {},
  updateArgument: () => {},
  appendOutput: () => {},
  setOutput: () => {},
  clearOutput: () => {},
})

interface ScriptProviderProps {
  workspace: WorkspaceDefinition
  children: React.ReactNode
}

export const ScriptProvider = ({
  workspace,
  children,
}: ScriptProviderProps) => {
  const [definition, setDefinition] = React.useState<
    ScriptDefinitionDetails | undefined
  >()
  const [processor, setProcessor] = React.useState<
    ScriptProcessor | undefined
  >()
  const [args, setArgs] = React.useState<ScriptArgument[]>([])
  const [output, setOutputLines] = React.useState<ScriptOutputLine[]>([])

  const deselectScript = () => {
    setDefinition(undefined)
    setProcessor(undefined)
    setArgs([])
    setOutputLines([])
  }

  const selectScript = (value: ScriptDefinitionDetails) => {
    setDefinition(value)
    setProcessor(createProcessor(value.group, value.definition, workspace))
    setArgs(initArgumanets(value.definition.args ?? []))
    setOutputLines([])
  }

  const updateArgument = (argument: ScriptArgument) => {
    const newArgs = [...args]
    newArgs[argument.index] = argument
    setArgs(newArgs)
  }

  const appendOutput = (line: ScriptOutputLine) => {
    setOutputLines([...output, line])
  }

  const setOutput = (lines: ScriptOutputLine[]) => {
    setOutputLines(lines)
  }

  const clearOutput = () => {
    setOutput([])
  }

  return (
    <ScriptContext.Provider
      value={{
        definition,
        processor,
        args,
        output,
        selectScript,
        deselectScript,
        updateArgument,
        appendOutput,
        setOutput,
        clearOutput,
      }}
    >
      {children}
    </ScriptContext.Provider>
  )
}

export default ScriptContext
