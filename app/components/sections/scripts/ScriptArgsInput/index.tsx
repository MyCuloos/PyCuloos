import React from "react"
import { Space, Typography } from "antd"
import { ScriptArg } from "../../../../types/settings"
import ScriptArgInput from "../ScriptArgInput"
import { ScriptArgument, ArgValue } from "../../../../types/scripts"
import { initArgumanets } from "../../../../converters/argsConverter"

interface Props {
  args: ScriptArg[]
  onChange: (value: string) => void
}

export default function ScriptArgsInput({ args, onChange }: Props) {
  const [argValues, setArgValues] = React.useState<ScriptArgument[]>(
    initArgumanets(args)
  )

  const buildArgsString = (values: ScriptArgument[]) =>
    values
      .map(x => `${x.definition.parameterName ?? ""} ${x.value}`.trim())
      .join(" ")

  const handleChange = (index: number, value: ArgValue) => {
    const newVal = [...argValues]
    newVal[index].value = value
    setArgValues(newVal)
    onChange(buildArgsString(newVal))
  }

  return (
    <Space direction="vertical">
      {argValues.map((x, index) => (
        <Space key={index}>
          <Typography.Text>{x.definition.name}</Typography.Text>
          <ScriptArgInput
            definition={x.definition}
            value={x.value}
            onChange={value => handleChange(index, value)}
          />
        </Space>
      ))}
    </Space>
  )
}
