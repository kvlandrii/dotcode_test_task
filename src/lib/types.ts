export interface ITransaction {
    id: string
    from: string
    to: string
    amount: number
}

export interface IBlockItem {
    id: number
    x: number
    y: number
    width: number
    height: number
    zIndex: number
}

export interface IResizeRef {
    width: string
    height: string
}

export interface IPosition {
    x: number
    y: number
}

export interface IHeaderButton {
    label: string
    href: string
}
