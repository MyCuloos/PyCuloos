import React from "react"
import { WorkspaceProvider } from "../../../../context/workspace/workspaceContext"

interface Props {
  children: React.ReactNode
}

export default function WorkspaceInitializer({ children }: Props) {
  return (
    <WorkspaceProvider
      file="./examples/simple-repo/settings.json"
      location="local"
    >
      {children}
    </WorkspaceProvider>
  )
}
