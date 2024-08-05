import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

const ResizablePanel: React.FC<{
  className?: string
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
  style?: any
}> = ({ className, leftPanel, rightPanel, style }) => {
  return (
    <PanelGroup autoSaveId="example" direction="horizontal" className={className} style={style}>
      <Panel defaultSizePercentage={100} className="relative z-0 border-r border-primary bg-transparent">
        {leftPanel}left
      </Panel>
      <PanelResizeHandle className="custom-resize-handle" />
      <Panel className="relative z-[1] bg-tertiary">{rightPanel}right</Panel>
    </PanelGroup>
  )
}

export default ResizablePanel
