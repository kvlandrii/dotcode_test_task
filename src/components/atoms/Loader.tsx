import { cn } from '@/utils/cn'
import { FC } from 'react'

interface ILoaderProps {
    size?: string
}

const Loader: FC<ILoaderProps> = ({ size = 'size-10' }) => {
    return (
        <div
            className={cn(
                'animate-spin rounded-full border-y-4 border-green-500',
                size
            )}
        />
    )
}

export default Loader
