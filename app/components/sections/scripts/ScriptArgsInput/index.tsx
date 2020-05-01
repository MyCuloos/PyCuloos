import React from "react"
import { Space, Typography } from "antd"
import ScriptArgInput from "../ScriptArgInput"
import { ScriptArgument, ArgValue } from "../../../../types/scripts"

interface Props {
  values: ScriptArgument[]
  onChange: (value: ScriptArgument[]) => void
}

export default function ScriptArgsInput({ values, onChange }: Props) {
  const handleChange = (index: number, argValue: ArgValue) => {
    const newVal = [...values]
    newVal[index].value = argValue
    onChange(newVal)
  }

  return (
    <Space direction="vertical">
      {values.map((x, index) => (
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
