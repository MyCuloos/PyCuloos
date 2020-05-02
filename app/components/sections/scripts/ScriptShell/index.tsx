import React from "react"
import { Row, Col, Button } from "antd"
import { CodepenOutlined, SaveOutlined } from "@ant-design/icons"
import MonacoEditor from "react-monaco-editor"
import { ScriptError } from "../../../../types/scripts"
import ScriptOutout from "../ScriptOutout"
import ScriptContext from "../../../../context/script/scriptContext"

export default function ScriptShell() {
  const script = React.useContext(ScriptContext)
  const [scriptContent, setScriptContent] = React.useState<string>()
  const [showSource, setShowSource] = React.useState(false)
  const [shellStatus, setShellStatus] = React.useState<"Running" | "Idle">(
    "Idle"
  )
  const [scriptOutput, setScriptOutput] = React.useState<string[]>([])
  const [buffer, setBuffer] = React.useState<string[]>([])

  React.useEffect(() => {
    script.processor?.readScript(contetn => setScriptContent(contetn))
  }, [])

  const stopScript = () => {
    script.processor?.stop()
  }

  const clearOutput = () => {
    setScriptOutput([])
    setBuffer([])
  }

  const clear = () => {
    stopScript()
    clearOutput()
  }

  const onUpdate = (data: any) => {
    buffer.push(data)
    setScriptOutput([...buffer])
  }

  const onCompleted = () => {
    setShellStatus("Idle")
  }

  const onError = (error: ScriptError) => {
    setScriptOutput([`${error.message} ${error.stackTrace}`])
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
        <ScriptOutout output={scriptOutput} />
      </div>
    </div>
  )
}
