'use client'
import { HEADER_BUTTONS } from '@/lib/constants'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname()

    return (
        <header className="flex items-center justify-center gap-7 h-10 w-full">
            {HEADER_BUTTONS.map((button, index) => {
                const isActive =
                    button.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(button.href)

                return (
                    <Link
                        key={index}
                        href={button.href}
                        className={cn(
                            'font-medium text-xl transition-styles h-8 px-2',
                            {
                                'text-gray-400 hover:scale-103 hover:text-gray-200':
                                    !isActive,
                                'text-white underline underline-offset-4 scale-107':
                                    isActive,
                            }
                        )}
                        aria-label={button.label}
                    >
                        {button.label}
                    </Link>
                )
            })}
        </header>
    )
}

export default Header
