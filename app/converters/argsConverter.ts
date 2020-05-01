import { ScriptArgument, ArgDefinition } from "../types/scripts"

const initArg = (arg: ArgDefinition): ScriptArgument => ({
  definition: arg,
  value: arg.default,
})

export const initArgumanets = (args: ArgDefinition[]): ScriptArgument[] =>
  args.map(initArg)
