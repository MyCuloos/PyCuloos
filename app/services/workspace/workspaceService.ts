import { WorkspaceDefinition } from "../../types/settings"
import { FileLocation, readFile } from "../files/filesService"

const parseWorkspaceDefinition = (content: string) =>
  JSON.parse(content) as WorkspaceDefinition

export const loadWowkspaceDefinition = (
  file: string,
  fileLocation: FileLocation,
  onLoaded: (settings: WorkspaceDefinition) => void,
  onError: (error: any) => void
) => {
  readFile(
    file,
    fileLocation,
    (content: string) => {
      const parsedSettings = parseWorkspaceDefinition(content)
      onLoaded(parsedSettings)
    },
    onError
  )
}
