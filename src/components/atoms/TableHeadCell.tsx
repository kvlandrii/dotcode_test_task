import { FC } from 'react'

interface ITableHeadCellProps {
    label: string
}

const TableHeadCell: FC<ITableHeadCellProps> = ({ label }) => {
    return (
        <th className="border border-gray-300 p-4 text-left text-2xl font-bold">
            {label}
        </th>
    )
}

export default TableHeadCell
