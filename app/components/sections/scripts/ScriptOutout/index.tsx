import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { css } from "glamor"

interface Props {
  output: string[]
  linePrefix: string
}

const root = css({
  flex: 1,
  paddingTop: "1rem",
  color: "green",
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

const ScriptOutout = ({ output, linePrefix }: Props) => {
  return (
    <div {...root}>
      <ScrollToBottom className={container}>
        {output.map((x, index) => (
          <p key={index} style={lineStyles}>
            {linePrefix}
            {x}
          </p>
        ))}
      </ScrollToBottom>
    </div>
  )
}

ScriptOutout.defaultProps = {
  linePrefix: " # ",
}

export default ScriptOutout
