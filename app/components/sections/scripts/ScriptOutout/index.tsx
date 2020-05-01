import React from "react"

interface Props {
  output: string[]
  linePrefix: string
}

const rootStyles = {
  flex: 1,
  paddingTop: "1rem",
  color: "green",
  backgroundColor: "black",
  position: "relative",
}

const container = {
  overflowY: "auto",
  position: "absolute",
  height: "100%",
  maxHeight: "100%",
  width: "100%",
  left: 0,
  top: 0,
}

const lineStyles = {
  marginBottom: 5,
  marginLeft: 5,
}

const ScriptOutout = ({ output, linePrefix }: Props) => {
  return (
    <div style={rootStyles as any}>
      <div style={container as any}>
        {output.map((x, index) => (
          <p key={index} style={lineStyles}>
            {linePrefix}
            {x}
          </p>
        ))}
      </div>
    </div>
  )
}

ScriptOutout.defaultProps = {
  linePrefix: " # ",
}

export default ScriptOutout
