import React from "react"
import { Input } from "antd"

interface Props {
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export default function StringArgInput({ value, onChange }: Props) {
  return <Input value={value} onChange={x => onChange(x.target.value)} />
}
