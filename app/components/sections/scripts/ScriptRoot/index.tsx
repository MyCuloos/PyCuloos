import React from "react"
import { Typography, Collapse } from "antd"
import { RightOutlined } from "@ant-design/icons"
import ScriptArgsInput from "../ScriptArgsInput"
import { ScriptProcessor } from "../../../../types/scripts"
import ScriptShell from "../ScriptShell"
import ScriptContext from "../../../../context/script/scriptContext"

export function ScriptRoot() {
  const script = React.useContext(ScriptContext)
  return (
    <div className="fx-col fx-1">
      <div>
        <Typography.Title level={3}>
          <strong>Script: </strong>
          <span style={{ fontWeight: "normal" }}>
            {script.definition?.definition.path}
          </span>
        </Typography.Title>
      </div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Collapse.Panel key="1" header="Params">
          <ScriptArgsInput
            values={script.args}
            onChange={script.updateArgument}
          />
        </Collapse.Panel>
      </Collapse>

      <div className="fx-col fx-1" style={{ marginTop: 12 }}>
        <ScriptShell />
      </div>
    </div>
  )
}
