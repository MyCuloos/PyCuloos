import { PythonShell } from "python-shell"
import { PythonSettings } from "../types/settings"
import { buildArgsStrings } from "../converters/argsConverter"
import { ScriptProcessorBase } from "./abstractions/processorBase"
import { ScriptArgument, ScriptError } from "../types/scripts"

export class PythonScriptProcessor extends ScriptProcessorBase {
  private shell: PythonShell | undefined

  constructor(
    scriptPath: string,
    scriptName: string,
    private settings: PythonSettings
  ) {
    super(scriptPath, scriptName)
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
}
