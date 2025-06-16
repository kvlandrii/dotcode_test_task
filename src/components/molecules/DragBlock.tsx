import { IBlockItem } from '@/lib/types'
import { cn } from '@/utils/cn'
import React from 'react'
import { Rnd } from 'react-rnd'

interface IDragBlockProps {
    block: IBlockItem
    isDragging: boolean
    onDragStart: (id: number) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDragStop: (id: number, d: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResizeStop: (id: number, ref: any, position: any) => void
    onBringToFront: (id: number) => void
    onDelete: (id: number) => void
}

export const DragBlock: React.FC<IDragBlockProps> = ({
    block,
    isDragging,
    onDragStart,
    onDragStop,
    onResizeStop,
    onBringToFront,
    onDelete,
}) => {
    return (
       <Rnd
            key={block.id}
            size={{ 
                width: block.width || 300, 
                height: block.height || 100 
            }}
            position={{ 
                x: block.x || 0, 
                y: block.y || 0 
            }}
            onDragStart={() => onDragStart(block.id)}
            onDragStop={(_, d) => onDragStop(block.id, { x: d.x, y: d.y })}
            onResizeStop={(_, __, ref, ___, pos) =>
                onResizeStop(block.id, {
                    width: ref.style.width,
                    height: ref.style.height
                }, {
                    x: pos.x,
                    y: pos.y
                })
            }
            bounds="parent"
            dragGrid={[10, 10]}
            resizeGrid={[10, 10]}
            minWidth={300}
            minHeight={100}
            maxWidth={600}
            maxHeight={400}
            className={cn(
                `absolute border transition-styles duration-50 bg-neutral-500 rounded-lg p-3`,
                {
                    'border-green-400 shadow-2xl': isDragging,
                    'hover:shadow-lg': !isDragging,
                }
            )}
            style={{
                zIndex: block.zIndex,
            }}
            onClick={() => onBringToFront(block.id)}
        >
            <div className="flex items-center justify-between w-full text-white font-bold">
                <span>Item {block.id}</span>
                <button
                    onClick={() => onDelete(block.id)}
                    className="size-6 flex items-center justify-center border rounded cursor-ponter active:scale-103"
                >
                    X
                </button>
            </div>
        </Rnd>
    )
}
