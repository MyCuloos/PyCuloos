import React from "react"
import { Row, Col, Button } from "antd"
import { CodepenOutlined, SaveOutlined } from "@ant-design/icons"
import MonacoEditor from "react-monaco-editor"
import { ScriptError, ScriptOutputLine } from "../../../../types/scripts"
import ScriptOutout from "../ScriptOutout"
import ScriptContext from "../../../../context/script/scriptContext"

export default function ScriptShell() {
  const script = React.useContext(ScriptContext)
  const [scriptContent, setScriptContent] = React.useState<string>()
  const [showSource, setShowSource] = React.useState(false)
  const [shellStatus, setShellStatus] = React.useState<"Running" | "Idle">(
    "Idle"
  )
  const [buffer, setBuffer] = React.useState<ScriptOutputLine[]>([])

  React.useEffect(() => {
    script.processor?.readScript(contetn => setScriptContent(contetn))
  }, [])

  const stopScript = () => {
    script.processor?.stop()
  }

  const clearOutput = () => {
    script.clearOutput()
    setBuffer([])
  }

  const clear = () => {
    stopScript()
    clearOutput()
  }

  const onUpdate = (data: any) => {
    buffer.push({
      level: "info",
      message: data,
      timestamp: new Date(),
    })
    script.setOutput([...buffer])
  }

  const onCompleted = () => {
    setShellStatus("Idle")
  }

  const onError = (error: ScriptError) => {
    script.appendOutput({
      level: "error",
      message: error.message,
      timestamp: new Date(),
    })
    if (error.stackTrace) {
      script.appendOutput({
        level: "error",
        message: error.stackTrace,
        timestamp: new Date(),
      })
    }
  }

  const runScript = () => {
    clearOutput()
    setShellStatus("Running")

    script.processor?.start(
      script.args,
      data => onUpdate(data),
      onCompleted,
      onError
    )
  }

  const saveScript = (content: string) => {
    script.processor?.updateScript(content)
  }

  return (
    <div className="fx-1 fx-col">
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

      <div className="fx-1 fx-col">
        <ScriptOutout output={script.output} />
      </div>
    </div>
  )
}
