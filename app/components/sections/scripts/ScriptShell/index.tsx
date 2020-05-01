import React from "react"
import { Row, Col, Button } from "antd"
import { CodepenOutlined, SaveOutlined } from "@ant-design/icons"
import MonacoEditor from "react-monaco-editor"
import Loader from "../../../ui/Loader"
import {
  ScriptProcessor,
  ScriptArgument,
  ScriptError,
} from "../../../../types/scripts"

interface Params {
  processor: ScriptProcessor
  scriptArgs: ScriptArgument[]
}

export default function ScriptShell({ processor, scriptArgs }: Params) {
  const [scriptContent, setScriptContent] = React.useState<string>()
  const [showSource, setShowSource] = React.useState(false)
  const [shellStatus, setShellStatus] = React.useState<"Running" | "Idle">(
    "Idle"
  )
  const [scriptOutput, setScriptOutput] = React.useState<string[] | undefined>()

  React.useEffect(() => {
    processor.readScript(script => setScriptContent(script))
  }, [])

  const appendLines = (lines: string[]) => {
    setScriptOutput(lines.concat(scriptOutput ?? []))
  }

  const stopScript = () => {
    processor.stop()
  }

  const clear = () => {
    stopScript()
    setScriptOutput(undefined)
  }

  const onUpdate = (data: any) => {
    const output = [] as string[]
    output.push(data)
    appendLines(output)
  }

  const onCompleted = () => {
    setShellStatus("Idle")
  }

  const onError = (error: ScriptError) => {
    setScriptOutput([`${error.message} ${error.stackTrace}`])
  }

  const runScript = () => {
    clear()
    setScriptOutput([])
    setShellStatus("Running")

    processor.start(scriptArgs, onUpdate, onCompleted, onError)
  }

  const saveScript = (content: string) => {
    processor.updateScript(content)
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
