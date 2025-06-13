import { FC } from 'react'
import BTCTableBody from '../molecules/BTCTableBody'
import BTCTableHead from '../molecules/BTCTableHead'
import { ITransaction } from '@/lib/types'

interface IBTCTableProps {
    transactions: ITransaction[]
}

const BTCTable: FC<IBTCTableProps> = ({ transactions }) => {
    return (
        <table className="w-full border-collapse">
            <BTCTableHead />
            <BTCTableBody transactions={transactions} />
        </table>
    )
}

export default BTCTable
