import { ScriptArgument, ArgDefinition } from "../types/scripts"

const initArg = (arg: ArgDefinition): ScriptArgument => ({
  definition: arg,
  value: arg.default,
})

export const initArgumanets = (args: ArgDefinition[]): ScriptArgument[] =>
  args.map(initArg)

export const buildArgsStrings = (values: ScriptArgument[]) =>
  values.map(x => `${x.definition.parameterName ?? ""} ${x.value ?? ""}`.trim())

export const buildArgsString = (values: ScriptArgument[]) =>
  buildArgsStrings(values).join(" ")
