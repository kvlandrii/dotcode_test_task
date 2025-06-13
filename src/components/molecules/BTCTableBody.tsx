import { FC } from 'react'
import TableDataCell from '../atoms/TableDataCell'
import { ITransaction } from '@/lib/types'

interface IBTCTableBodyProps {
    transactions: ITransaction[]
}

const BTCTableBody: FC<IBTCTableBodyProps> = ({ transactions }) => {
    return (
        <tbody>
            {transactions.map((tx) => (
                <tr key={tx.id}>
                    <TableDataCell data={tx.from} />
                    <TableDataCell data={tx.to} />
                    <TableDataCell data={tx.amount.toFixed(7) + ' BTC'} />
                </tr>
            ))}
        </tbody>
    )
}

export default BTCTableBody
