import { LOCAL_STORAGE_KEY } from '@/lib/constants'
import { IBlockItem } from '@/lib/types'

export const useLocalStorage = () => {
    const storage = typeof window !== 'undefined' ? window.localStorage : null

    const saveBlocks = (blocks: IBlockItem[]) => {
        if (storage) {
            const cleanBlocks = blocks.map((block) => ({
                id: block.id,
                x: block.x,
                y: block.y,
                width: block.width,
                height: block.height,
                zIndex: block.zIndex,
            }))
            storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanBlocks))
        }
    }

    const loadBlocks = (): IBlockItem[] | null => {
        if (!storage) return null

        const savedBlocks = storage.getItem(LOCAL_STORAGE_KEY)
        if (!savedBlocks) return null

        try {
            return JSON.parse(savedBlocks)
        } catch (e) {
            console.error('Failed to parse saved blocks', e)
            return null
        }
    }

    const clearBlocks = () => {
        if (storage) {
            storage.removeItem(LOCAL_STORAGE_KEY)
        }
    }

    return { saveBlocks, loadBlocks, clearBlocks }
}
