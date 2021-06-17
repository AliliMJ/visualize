import { useMemo } from 'react';
import Table from '../../components/common/table';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const ActivityTable = ({ activities }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Nom',
                accessor: 'name',
                Cell: ({ row }) => (
                    <Link
                        to={`/activities/${row.original.docID}`}
                        className="text-blue-400 underline"
                    >
                        {row.original.name}
                    </Link>
                ),
            },
            {
                Header: 'Tranche',
                accessor: 'phase',
                Cell: ({ row }) => (
                    <span className="text-gray-400">
                        {row.original.phase} / {activities.length}
                    </span>
                ),
            },
            {
                Header: 'Etat',
                accessor: 'state',
                Cell: ({ row }) => (
                    <span
                        className={classNames(
                            'rounded-full px-4 py-1 text-white',
                            {
                                'bg-gray-400':
                                    row.original.state === 'Not started',
                                'bg-blue-400':
                                    row.original.state === 'In progress',
                                'bg-green-400': row.original.state === 'Done',
                                'bg-red-400': row.original.state === 'Retarded',
                            }
                        )}
                    >
                        {row.original.state}
                    </span>
                ),
            },
        ],
        [activities]
    );

    return <Table columns={columns} data={activities} />;
};

export default ActivityTable;
