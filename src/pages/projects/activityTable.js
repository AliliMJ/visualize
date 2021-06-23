import { useMemo } from 'react';
import Table from '../../components/common/table';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
                                'bg-red-400': row.original.state === 'Retard',
                            }
                        )}
                    >
                        {row.original.state}
                    </span>
                ),
            },
            {
                Header: 'Pourcentage',

                Cell: ({ row }) => (
                    <CircularProgressbar
                        className="w-10 h-10 font-bold"
                        value={row.original.percentage}
                        text={`${row.original.percentage}%`}
                    />
                ),
            },
        ],
        [activities]
    );

    return <Table columns={columns} data={activities} />;
};

export default ActivityTable;
