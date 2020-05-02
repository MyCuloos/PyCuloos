import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { css } from "glamor"
import { format } from "date-fns"
import { ScriptOutputLine, OutputLevel } from "../../../../types/scripts"

interface Props {
  output: ScriptOutputLine[]
}

const root = css({
  flex: 1,
  paddingTop: "1rem",
  backgroundColor: "black",
  position: "relative",
})

const container = css({
  overflowY: "auto",
  position: "absolute",
  height: "100%",
  maxHeight: "100%",
  width: "100%",
  left: 0,
  top: 0,
})

const lineStyles = {
  marginBottom: 5,
  marginLeft: 5,
}

const getColor = (level: OutputLevel) => {
  switch (level) {
    case "error":
      return "red"
    default:
      return "white"
  }
}

const ScriptOutout = ({ output }: Props) => {
  const formatLine = (line: ScriptOutputLine) =>
    `# ${format(line.timestamp, "HH:mm:ss.SSS")} | ${line.level} | ${
      line.message
    }`

  return (
    <div {...root}>
      <ScrollToBottom className={container}>
        {output.map((x, index) => (
          <p key={index} style={lineStyles}>
            <span style={{ color: getColor(x.level) }}>{formatLine(x)}</span>
          </p>
        ))}
      </ScrollToBottom>
    </div>
  )
}

export default ScriptOutout
