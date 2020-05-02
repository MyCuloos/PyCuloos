import shell from "shelljs"
import {
  ScriptProcessor,
  ScriptArgument,
  ScriptError,
} from "../../types/scripts"
import {
  readLocalFile,
  writeLocalFile,
} from "../../services/files/filesService"

export abstract class ScriptProcessorBase implements ScriptProcessor {
  constructor(protected scriptPath: string, protected scriptName: string) {
    shell.cd(`${__dirname}/..`)
  }

  protected filePath() {
    return `${this.scriptPath}/${this.scriptName}`
  }

  abstract start(
    args: ScriptArgument[],
    onDataReceived: (data: any) => void,
    onCompleted: (data: any) => void,
    onError: (error: ScriptError) => void
  ): void

  abstract stop(): void

  readScript(onLoaded: (content: string) => void): void {
    readLocalFile(
      this.filePath(),
      script => onLoaded(script),
      () => {}
    )
  }

  updateScript(content: string): void {
    writeLocalFile(
      this.filePath(),
      content,
      () => {},
      () => {}
    )
  }
}
