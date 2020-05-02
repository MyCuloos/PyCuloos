import { ScriptArgument, ArgDefinition } from "../types/scripts"

const initArg = (arg: ArgDefinition, index: number): ScriptArgument => ({
  definition: arg,
  value: arg.default,
  index,
})

export const initArgumanets = (args: ArgDefinition[]): ScriptArgument[] =>
  args.map((x, index) => initArg(x, index))

export const buildArgsStrings = (values: ScriptArgument[]) =>
  values.map(x => `${x.definition.parameterName ?? ""} ${x.value ?? ""}`.trim())

export const buildArgsString = (values: ScriptArgument[]) =>
  buildArgsStrings(values).join(" ")
