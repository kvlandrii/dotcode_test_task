import TableHeadCell from '../atoms/TableHeadCell'

const BTCTableHead = () => {
    return (
        <thead>
            <tr>
                <TableHeadCell label="From" />
                <TableHeadCell label="To" />
                <TableHeadCell label="Sum" />
            </tr>
        </thead>
    )
}

export default BTCTableHead
