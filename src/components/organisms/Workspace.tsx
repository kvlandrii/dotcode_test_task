import { IBlockItem } from '@/lib/types'
import React from 'react'
import { DragBlock } from '../molecules/DragBlock'

interface IWorkspaceProps {
    blocks: IBlockItem[]
    draggingId: number | null
    onDragStart: (id: number) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDragStop: (id: number, d: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResizeStop: (id: number, ref: any, position: any) => void
    onBringToFront: (id: number) => void
    onDelete: (id: number) => void
}

const Workspace: React.FC<IWorkspaceProps> = ({
    blocks,
    draggingId,
    onDragStart,
    onDragStop,
    onResizeStop,
    onBringToFront,
    onDelete,
}) => {
    return (
        <>
            {blocks.map((block) => (
                <DragBlock
                    key={block.id}
                    block={block}
                    isDragging={draggingId === block.id}
                    onDragStart={onDragStart}
                    onDragStop={onDragStop}
                    onResizeStop={onResizeStop}
                    onBringToFront={onBringToFront}
                    onDelete={onDelete}
                />
            ))}
        </>
    )
}

export default Workspace
