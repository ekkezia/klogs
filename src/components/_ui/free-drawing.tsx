"use client"

import React from "react"
import { Stage, Layer, Line, Text } from "react-konva"
import Konva from "konva"

type Tool = "pen" | "eraser"

interface LineProps {
  tool: Tool
  points: number[]
}

const FreeDrawing: React.FC<{ className?: string }> = ({ className }) => {
  const [tool, setTool] = React.useState<Tool>("pen")
  const [lines, setLines] = React.useState<LineProps[]>([])

  const isDrawing = React.useRef<boolean>(false)

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true
    const pos = e.target.getStage()?.getPointerPosition()
    if (pos) {
      setLines([...lines, { tool, points: [pos.x, pos.y] }])
    }
  }

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage?.getPointerPosition()
    if (point) {
      const lastLine = lines[lines.length - 1]
      if (lastLine) {
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y])

        // replace last
        setLines(lines.slice(0, -1).concat([lastLine]))
      }
    }
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div className={className}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
            />
          ))}
        </Layer>
      </Stage>
      <select
        style={{ position: "absolute", top: "5px", left: "5px" }}
        value={tool}
        onChange={(e) => {
          setTool(e.target.value as Tool)
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  )
}

export default FreeDrawing
