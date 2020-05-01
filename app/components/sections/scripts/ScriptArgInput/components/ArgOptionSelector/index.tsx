import React from "react"
import { Select } from "antd"
import { ArgOption, ArgValue } from "../../../../../../types/scripts"

interface Props {
  allowBlank?: boolean
  options: ArgOption[]
  value: ArgValue
  onChange: (value: ArgValue) => void
}

const ArgOptionSelector = ({ allowBlank, options, value, onChange }: Props) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ minWidth: 150 }}
      allowClear={allowBlank}
    >
      {options.map(opt => (
        <Select.Option key={opt.value} value={opt.value ?? ""}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default ArgOptionSelector
