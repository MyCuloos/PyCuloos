import React from "react"
import WorkspaceLayout from "../WorkspaceLayout"
import { WorkspaceDefinition } from "../../../../types/settings"
import { ScriptProvider } from "../../../../context/script/scriptContext"

interface Params {
  definition: WorkspaceDefinition
}

export default function WorkspaceRoot({ definition }: Params) {
  return (
    <>
      {definition ? (
        <ScriptProvider workspace={definition}>
          <WorkspaceLayout definition={definition} />
        </ScriptProvider>
      ) : (
        undefined
      )}
    </>
  )
}
