import { PythonShell } from "python-shell"
import {
  ScriptProcessor,
  ScriptArgument,
  ScriptError,
} from "../../types/scripts"
import { PythonSettings } from "../../types/settings"
import {
  readLocalFile,
  writeLocalFile,
} from "../../services/files/filesService"
import { buildArgsStrings } from "../../converters/argsConverter"

export class PythonScriptProcessor implements ScriptProcessor {
  private shell: PythonShell | undefined

  constructor(
    private scriptPath: string,
    private scriptName: string,
    private settings: PythonSettings
  ) {}

  private filePath() {
    return `${this.scriptPath}/${this.scriptName}`
  }

  start(
    args: ScriptArgument[],
    onDataReceived: (data: any) => void,
    onCompleted: (data: any) => void,
    onError: (error: ScriptError) => void
  ): void {
    const options = {
      mode: this.settings.defaultParams.mode,
      pythonPath: this.settings.path,
      pythonOptions: this.settings.defaultParams.options,
      scriptPath: this.scriptPath,
      args: buildArgsStrings(args),
    }
    const pyShell = new PythonShell(this.scriptName, options as any)
    pyShell.on("message", (message: string) => {
      onDataReceived(message)
    })
    pyShell.end(err => {
      if (err) {
        onError({
          message: err.message,
          stackTrace: err.stack,
        })
      }
      onCompleted({})
    })
    this.shell = pyShell
  }

  stop(): void {
    this.shell?.terminate()
    this.shell = undefined
  }

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
