"use client"

import React from "react"
import { Stage, Layer, Line } from "react-konva"
import Konva from "konva"
import { motion } from "framer-motion"
import { useThemeContext } from "@/contexts/theme-context"

type Tool = "pen" | "eraser"

interface LineProps {
  tool: Tool
  points: number[]
}

const FreeDrawing: React.FC<{ className?: string; showToolbar?: boolean; style?: any }> = ({
  className,
  showToolbar,
  style,
}) => {
  const { primaryColor } = useThemeContext()

  const [tool, setTool] = React.useState<Tool>("pen")
  const [lines, setLines] = React.useState<LineProps[]>([])

  const isDrawing = React.useRef<boolean>(false)

  // Mouse
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

  // Touch (mobile / tablet)
  const handlePointerDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
  isDrawing.current = true;
  const pos = e.target.getStage()?.getPointerPosition();
  if (pos) {
    setLines((prevLines) => [...prevLines, { tool, points: [pos.x, pos.y] }]);
  }
};

const handlePointerMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
  if (!isDrawing.current) return;

  const stage = e.target.getStage();
  const point = stage?.getPointerPosition();
  if (point) {
    setLines((prevLines) => {
      const newLines = [...prevLines];
      const lastLine = newLines[newLines.length - 1];
      if (lastLine) {
        lastLine.points = lastLine.points.concat([point.x, point.y]);
      }
      return newLines;
    });
  }
};

const handlePointerUp = () => {
  isDrawing.current = false;
};

  return (
    <div className={className} style={style}>
      <Stage
        width={window.innerWidth - 48 * 2}
        height={window.innerHeight - 48 * 2}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={primaryColor}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
            />
          ))}
        </Layer>
      </Stage>
      {showToolbar && (
        <motion.div
          className="group absolute top-1/2 flex cursor-pointer items-center justify-center border border-primary"
          drag
          dragMomentum={false}
        >
          <div
            onClick={() => setTool("pen")}
            className="flex h-[48px] w-[48px] items-center justify-center border-r border-primary bg-primary hover:bg-secondary group-hover:bg-transparent"
          >
            {tool === "pen" ? "🖋️" : "🗑️"}{" "}
          </div>
          <div
            onClick={() => setTool("eraser")}
            className="hidden h-[48px] w-[48px] items-center justify-center hover:bg-secondary group-hover:flex"
          >
            {tool === "pen" ? "🗑️" : "🖋️"}{" "}
          </div>
        </motion.div>
      )}{" "}
    </div>
  )
}

export default FreeDrawing
