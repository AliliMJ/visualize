import Table from '../../components/common/table';
import { useMemo } from 'react';
const FactureTable = ({ factures }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Taux (dzd)',
                accessor: 'amount',
                Cell: ({ row }) => (
                    <span
                        className={`${
                            row.original.amount >= 0
                                ? 'text-green-400'
                                : 'text-red-400'
                        } font-bold`}
                    >
                        {row.original.amount > 0 ? '+' : null}
                        {row.original.amount}
                    </span>
                ),
            },
            { Header: 'Date', accessor: 'date' },
            { Header: 'Ajouté par', accessor: 'by' },
        ],
        []
    );
    return <Table columns={columns} data={factures} />;
};

export default FactureTable;
