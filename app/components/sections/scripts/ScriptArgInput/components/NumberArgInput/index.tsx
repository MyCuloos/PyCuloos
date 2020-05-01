import React from "react"
import { InputNumber } from "antd"

interface Props {
  value: number | undefined
  onChange: (value: number | undefined) => void
}

export default function NumberArgInput({ value, onChange }: Props) {
  return <InputNumber value={value} onChange={x => onChange(x)} />
}
