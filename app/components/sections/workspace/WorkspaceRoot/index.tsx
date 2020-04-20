import React from "react"
import WorkspaceLayout from "../WorkspaceLayout"
import { WorkspaceDefinition } from "../../../../types/settings"

interface Params {
  definition: WorkspaceDefinition
}

export default function WorkspaceRoot({ definition }: Params) {
  return (
    <>{definition ? <WorkspaceLayout definition={definition} /> : undefined}</>
  )
}
