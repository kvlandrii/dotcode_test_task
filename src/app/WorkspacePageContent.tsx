'use client'

import ControlButton from '@/components/atoms/ControlButton'
import Workspace from '@/components/organisms/Workspace'
import { useWorkspace } from '@/hooks/useWorkspace'

const WorkspacePageContent = () => {
    const {
        blocks,
        draggingId,
        bringToFront,
        onDragStart,
        onDragStop,
        onResizeStop,
        deleteBlock,
        resetBlocks,
    } = useWorkspace()

    return (
        <div className="flex flex-col items-center gap-5 p-5">
            <ControlButton label="Reset" onClick={resetBlocks} color="red" />

            <div className="relative w-full h-svh transition-styles">
                <Workspace
                    blocks={blocks}
                    draggingId={draggingId}
                    onDragStart={onDragStart}
                    onDragStop={onDragStop}
                    onResizeStop={onResizeStop}
                    onBringToFront={bringToFront}
                    onDelete={deleteBlock}
                />
            </div>
        </div>
    )
}

export default WorkspacePageContent
