import React from "react"
import StringArgInput from "./components/StringArgInput"
import NumberArgInput from "./components/NumberArgInput"
import FilepathArgInput from "./components/FilepahArgInput"
import { ArgValue, ArgDefinition } from "../../../../types/scripts"

interface Props {
  definition: ArgDefinition
  value: ArgValue
  onChange: (value: ArgValue) => void
}

export default function ScriptArgInput({ definition, value, onChange }: Props) {
  switch (definition.type) {
    case "string":
      return (
        <StringArgInput
          value={value as string | undefined}
          onChange={onChange}
        />
      )
    case "filepath":
      return (
        <FilepathArgInput
          value={value as string | undefined}
          onChange={onChange}
        />
      )
    case "int":
    case "decimal":
      return (
        <NumberArgInput
          value={value as number | undefined}
          onChange={onChange}
        />
      )
    default:
      return <></>
  }
}
