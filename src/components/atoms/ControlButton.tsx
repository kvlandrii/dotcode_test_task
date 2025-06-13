import { cn } from '@/utils/cn'
import { FC } from 'react'

const BUTTON_COLORS = {
    red: 'bg-rose-600',
    green: 'bg-emerald-500',
    yellow: 'bg-amber-400',
}

type ButtonColor = keyof typeof BUTTON_COLORS

interface IControlButtonProps {
    color: ButtonColor
    label: string
    onClick: () => void
    disabled?: boolean
}

const ControlButton: FC<IControlButtonProps> = ({
    color,
    label,
    onClick,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            type="button"
            disabled={disabled}
            className={cn(
                'flex items-center w-fit px-8 h-10 text-white rounded-md font-medium text-xl transition-styles cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
                BUTTON_COLORS[color]
            )}
        >
            {label}
        </button>
    )
}

export default ControlButton
