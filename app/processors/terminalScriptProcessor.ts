import shell from "shelljs"
import { ChildProcess } from "child_process"
import { ScriptProcessorBase } from "./abstractions/processorBase"
import { ScriptArgument, ScriptError } from "../types/scripts"
import { buildArgsString } from "../converters/argsConverter"

function bash(command: string) {
  return `bash ${command}`
}

function scriptCommand(commandName: string, args: ScriptArgument[]) {
  return args.length > 0
    ? `${bash(commandName)} ${buildArgsString(args)}`
    : bash(commandName)
}

export class TerminalScriptProcessor extends ScriptProcessorBase {
  private process: ChildProcess | undefined

  start(
    args: ScriptArgument[],
    onDataReceived: (data: any) => void,
    onCompleted: (data: any) => void,
    onError: (error: ScriptError) => void
  ): void {
    if (this.process) {
      this.stop()
    }

    shell.cd(__dirname)
    shell.cd(this.scriptPath)
    const process = shell.exec(scriptCommand(this.scriptName, args), {
      async: true,
    })
    process.stdout?.on("data", data => onDataReceived(data))
    process.on("message", data => onDataReceived(data))
    process.on("exit", (code: number) =>
      onCompleted({
        exitCode: code,
      })
    )
    process.on("error", error =>
      onError({
        message: error.message,
        stackTrace: error.stack,
      })
    )

    this.process = process
  }

  stop(): void {
    this.process?.kill()
    this.process = undefined
  }
}
