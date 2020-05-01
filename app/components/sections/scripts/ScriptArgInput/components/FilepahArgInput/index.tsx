import React from "react"
import { Upload, Button } from "antd"
import { FileOutlined } from "@ant-design/icons"

interface Props {
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export default function FilepathArgInput({ value, onChange }: Props) {
  return (
    <Upload
      onChange={x => console.log(x)}
      onRemove={() => console.log("removed")}
      beforeUpload={() => false}
    >
      <Button>
        <FileOutlined />
        {" Path"}
      </Button>
    </Upload>
  )
}
