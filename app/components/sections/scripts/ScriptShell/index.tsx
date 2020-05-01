import React from "react"
import { PythonShell } from "python-shell"
import { Row, Col, Button } from "antd"
import { CodepenOutlined, SaveOutlined } from "@ant-design/icons"
import MonacoEditor from "react-monaco-editor"
import { PythonSettings } from "../../../../types/settings"
import {
  readLocalFile,
  writeLocalFile,
} from "../../../../services/files/filesService"
import Loader from "../../../ui/Loader"

interface Params {
  scriptPath: string
  scriptName: string
  scriptArgs: string[]
  python: PythonSettings
}

export default function ScriptShell({
  scriptPath,
  scriptName,
  scriptArgs,
  python,
}: Params) {
  const [scriptContent, setScriptContent] = React.useState<string>()
  const [showSource, setShowSource] = React.useState(false)
  const [shell, setShell] = React.useState<PythonShell>()
  const [shellStatus, setShellStatus] = React.useState<"Running" | "Idle">(
    "Idle"
  )
  const [scriptOutput, setScriptOutput] = React.useState<string[] | undefined>()

  const filePath = () => `${scriptPath}/${scriptName}`

  React.useEffect(() => {
    readLocalFile(
      filePath(),
      script => setScriptContent(script),
      () => {}
    )
  }, [])

  const appendLines = (lines: string[]) => {
    setScriptOutput(lines.concat(scriptOutput ?? []))
  }

  const stopScript = () => {
    shell?.terminate()
    setShell(undefined)
  }

  const clear = () => {
    stopScript()
    setScriptOutput(undefined)
  }

  const runScript = () => {
    clear()
    const output = [] as string[]
    const updater = (line: string) => {
      output.push(line)
      appendLines(output)
    }
    setScriptOutput([])
    setShellStatus("Running")
    const options = {
      mode: python.defaultParams.mode,
      pythonPath: python.path,
      pythonOptions: python.defaultParams.options,
      scriptPath,
      args: scriptArgs,
    }
    const pyShell = new PythonShell(scriptName, options as any)
    pyShell.on("message", (message: string) => {
      updater(message)
    })
    pyShell.end(err => {
      setShellStatus("Idle")
      if (err) {
        setScriptOutput([`${err.message} ${err.stack}`])
      }
    })
    setShell(pyShell)
  }

  const saveScript = (content: string) => {
    writeLocalFile(
      filePath(),
      content,
      () => {},
      () => {}
    )
  }

  return (
    <div>
      <Row justify="center">
        <Col>
          {shellStatus === "Idle" ? (
            <Button
              onClick={() => runScript()}
              type="primary"
              style={{ margin: 5 }}
            >
              RUN
            </Button>
          ) : (
            <Button
              onClick={() => stopScript()}
              type="primary"
              danger
              style={{ margin: 5 }}
            >
              STOP
            </Button>
          )}
        </Col>
        <Col>
          <Button onClick={() => clear()} style={{ margin: 5 }}>
            Clear
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => setShowSource(!showSource)}
            icon={<CodepenOutlined />}
            style={{ margin: 5 }}
          />
        </Col>
        {scriptContent ? (
          <Col>
            <Button
              onClick={() => saveScript(scriptContent)}
              icon={<SaveOutlined />}
              style={{ margin: 5 }}
            />
          </Col>
        ) : (
          undefined
        )}
      </Row>

      {showSource ? (
        <div>
          <MonacoEditor
            width="800"
            height="600"
            language="python"
            theme="vs-dark"
            options={{
              lineNumbers: "on",
            }}
            value={scriptContent}
            onChange={x => setScriptContent(x)}
          />
        </div>
      ) : (
        undefined
      )}

      {shellStatus === "Running" ? (
        <div style={{ textAlign: "center", paddingTop: "1rem" }}>
          <Loader />
        </div>
      ) : (
        undefined
      )}

      {scriptOutput ? (
        <div style={{ textAlign: "center", paddingTop: "1rem" }}>
          {scriptOutput.reverse().map((x, index) => (
            <p key={index}>{x}</p>
          ))}
        </div>
      ) : (
        undefined
      )}
    </div>
  )
}
