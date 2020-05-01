import React from "react"
import { Space, Typography } from "antd"
import ScriptArgInput from "../ScriptArgInput"
import {
  ScriptArgument,
  ArgValue,
  ArgDefinition,
} from "../../../../types/scripts"
import { initArgumanets } from "../../../../converters/argsConverter"

interface Props {
  args: ArgDefinition[]
  onChange: (value: ScriptArgument[]) => void
}

export default function ScriptArgsInput({ args, onChange }: Props) {
  const [argValues, setArgValues] = React.useState<ScriptArgument[]>([])

  const updateArguments = (newValue: ScriptArgument[]) => {
    setArgValues(newValue)
    onChange(newValue)
  }

  React.useEffect(() => {
    updateArguments(initArgumanets(args))
  }, [])

  const handleChange = (index: number, value: ArgValue) => {
    const newVal = [...argValues]
    newVal[index].value = value
    updateArguments(newVal)
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
