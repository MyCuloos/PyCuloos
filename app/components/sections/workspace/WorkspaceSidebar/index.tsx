import React from "react"
import { LaptopOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { ScriptGroup, ScriptDefinition } from "../../../../types/settings"

interface Params {
  scriptGroups: ScriptGroup[]
  onScriptSelected: (value: SelectedScript) => void
}

interface SelectedScript {
  group: ScriptGroup
  script: ScriptDefinition
}

export default function WorkspaceSidebar({
  scriptGroups,
  onScriptSelected,
}: Params) {
  const handleMenuSelected = (group: ScriptGroup, script: ScriptDefinition) => {
    onScriptSelected({
      group,
      script,
    })
  }
  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        defaultOpenKeys={["sub0"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {scriptGroups.map((group, index) => (
          <Menu.SubMenu
            key={`sub${index}`}
            title={
              <span>
                <LaptopOutlined />
                {group.name}
              </span>
            }
          >
            {group.scripts.map((script, scriptIndex) => (
              <Menu.Item
                key={`${index}-${scriptIndex}`}
                onClick={() => handleMenuSelected(group, script)}
              >
                {script.name}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </>
  )
}
