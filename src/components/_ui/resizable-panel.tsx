import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const ResizablePanel: React.FC<{ className?: string, leftPanel?: React.ReactNode, rightPanel?: React.ReactNode }> = ({ className, leftPanel, rightPanel }) => {
  return (
    <PanelGroup autoSaveId="example" direction="horizontal" className={className}>
  <Panel defaultSizePercentage={100} className="border-r border-primary bg-transparent z-0 relative">
    {leftPanel}left
  </Panel>
  <PanelResizeHandle />
  <Panel className="bg-white z-[1] relative">
    {rightPanel}right
  </Panel>
</PanelGroup>
  )
}

export default ResizablePanel
