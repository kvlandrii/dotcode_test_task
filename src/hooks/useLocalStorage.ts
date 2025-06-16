'use client'
import { LOCAL_STORAGE_KEY } from '@/lib/constants'
import { IBlockItem } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useLocalStorage = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const saveBlocks = (blocks: IBlockItem[]) => {
        if (isClient && typeof window !== 'undefined') {
            try {
                const cleanBlocks = blocks.map((block) => ({
                    id: block.id,
                    x: block.x,
                    y: block.y,
                    width: block.width,
                    height: block.height,
                    zIndex: block.zIndex,
                }))
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanBlocks))
            } catch (e) {
                console.error('Failed to save blocks to localStorage', e)
            }
        }
    }

    const loadBlocks = (): IBlockItem[] | null => {
        if (!isClient || typeof window === 'undefined') return null

        try {
            const savedBlocks = window.localStorage.getItem(LOCAL_STORAGE_KEY)
            if (!savedBlocks) return null
            return JSON.parse(savedBlocks)
        } catch (e) {
            console.error('Failed to parse saved blocks', e)
            return null
        }
    }

    const clearBlocks = () => {
        if (isClient && typeof window !== 'undefined') {
            try {
                window.localStorage.removeItem(LOCAL_STORAGE_KEY)
            } catch (e) {
                console.error('Failed to clear blocks from localStorage', e)
            }
        }
    }

    return { saveBlocks, loadBlocks, clearBlocks, isClient }
}