import { IBlockItem, IPosition, IResizeRef } from '@/lib/types'
import { useEffect, useReducer, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

const DEFAULT_BLOCKS: IBlockItem[] = [1, 2, 3, 4, 5].map((id) => ({
    id,
    x: 10 + ((id - 1) % 3) * 320,
    y: 10 + Math.floor((id - 1) / 3) * 120,
    width: 300,
    height: 100,
    zIndex: 1,
}))

type WorkspaceAction =
    | { type: 'SET_BLOCKS'; payload: IBlockItem[] }
    | { type: 'BRING_TO_FRONT'; id: number }
    | { type: 'UPDATE_POSITION'; id: number; position: IPosition }
    | {
          type: 'UPDATE_SIZE'
          id: number
          size: { width: number; height: number }
          position: IPosition
      }
    | { type: 'DELETE_BLOCK'; id: number }
    | { type: 'RESET_BLOCKS' }

function workspaceReducer(
    state: IBlockItem[],
    action: WorkspaceAction
): IBlockItem[] {
    switch (action.type) {
        case 'SET_BLOCKS':
            return action.payload
        case 'BRING_TO_FRONT':
            return state.map((block) => ({
                ...block,
                zIndex: block.id === action.id ? 10 : 1,
            }))
        case 'UPDATE_POSITION':
            return state.map((block) =>
                block.id === action.id
                    ? { ...block, ...action.position }
                    : block
            )
        case 'UPDATE_SIZE':
            return state.map((block) =>
                block.id === action.id
                    ? { ...block, ...action.size, ...action.position }
                    : block
            )
        case 'DELETE_BLOCK':
            return state.filter((block) => block.id !== action.id)
        case 'RESET_BLOCKS':
            return DEFAULT_BLOCKS
        default:
            return state
    }
}

export const useWorkspace = () => {
    const [blocks, dispatch] = useReducer(workspaceReducer, DEFAULT_BLOCKS)
    const [draggingId, setDraggingId] = useState<number | null>(null)
    const [isClientReady, setIsClientReady] = useState(false)
    const { saveBlocks, loadBlocks, clearBlocks, isClient } = useLocalStorage()

    useEffect(() => {
        if (isClient) {
            setIsClientReady(true)
            const savedBlocks = loadBlocks()
            if (savedBlocks) {
                dispatch({ type: 'SET_BLOCKS', payload: savedBlocks })
            }
        }
    }, [isClient])

    useEffect(() => {
        if (isClientReady) {
            saveBlocks(blocks)
        }
    }, [blocks, isClientReady])

    const bringToFront = (id: number) => {
        dispatch({ type: 'BRING_TO_FRONT', id })
    }

    const onDragStart = (id: number) => {
        setDraggingId(id)
        bringToFront(id)
    }

    const onDragStop = (id: number, position: IPosition) => {
        dispatch({ type: 'UPDATE_POSITION', id, position })
        setDraggingId(null)
    }

    const onResizeStop = (
        id: number,
        resizeRef: IResizeRef,
        position: IPosition
    ) => {
        const width = resizeRef.width ? parseInt(resizeRef.width.toString()) : 300
        const height = resizeRef.height ? parseInt(resizeRef.height.toString()) : 100

       dispatch({
            type: 'UPDATE_SIZE',
            id,
            size: {
                width: isNaN(width) ? 300 : width,
                height: isNaN(height) ? 100 : height,
            },
            position: {
                x: position.x ?? 0,
                y: position.y ?? 0,
            },
        })
    }

    const deleteBlock = (id: number) => {
        dispatch({ type: 'DELETE_BLOCK', id })
    }

    const resetBlocks = () => {
        dispatch({ type: 'RESET_BLOCKS' })
        clearBlocks()
    }

    return {
        blocks,
        draggingId,
        bringToFront,
        onDragStart,
        onDragStop,
        onResizeStop,
        deleteBlock,
        resetBlocks,
    }
}
