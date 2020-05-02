import React from "react"
import { Space, Typography } from "antd"
import ScriptArgInput from "../ScriptArgInput"
import { ScriptArgument, ArgValue } from "../../../../types/scripts"

interface Props {
  values: ScriptArgument[]
  onChange: (value: ScriptArgument) => void
}

export default function ScriptArgsInput({ values, onChange }: Props) {
  const handleChange = (index: number, argValue: ArgValue) => {
    onChange({
      ...values[index],
      value: argValue,
    })
  }

  return (
    <Space direction="vertical">
      {values.map(x => (
        <Space key={x.index}>
          <Typography.Text>{x.definition.name}</Typography.Text>
          <ScriptArgInput
            definition={x.definition}
            value={x.value}
            onChange={value => handleChange(x.index, value)}
          />
        </Space>
      ))}
    </Space>
  )
}
