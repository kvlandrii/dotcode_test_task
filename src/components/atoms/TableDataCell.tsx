import { FC } from 'react'

interface ITableDataCellProps {
    data: string | number
}

const TableDataCell: FC<ITableDataCellProps> = ({ data }) => {
    return <td className="border border-gray-300 p-4 break-all">{data}</td>
}

export default TableDataCell
