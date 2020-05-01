import React from "react"
import { Breadcrumb } from "antd"
import { SelectedScriptItem } from "../../../../types/ui"

interface Props {
  script: SelectedScriptItem
}

export function WorkspaceBreadcrumb({ script }: Props) {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>{script.group.name}</Breadcrumb.Item>
      <Breadcrumb.Item>{script.definition.name}</Breadcrumb.Item>
    </Breadcrumb>
  )
}
