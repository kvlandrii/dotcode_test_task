import { FC } from 'react'

interface IBTCSumDisplayProps {
    totalSum: number
    toFixed?: number
}

const BTCSumDisplay: FC<IBTCSumDisplayProps> = ({ totalSum, toFixed = 7 }) => {
    return (
        <span className="text-3xl font-bold">
            Sum = {totalSum.toFixed(toFixed)} BTC
        </span>
    )
}

export default BTCSumDisplay
