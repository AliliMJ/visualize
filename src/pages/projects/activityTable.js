import { useMemo } from 'react';
import Table from '../../components/common/table';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import IconButton from '../../components/common/iconButton';
import { FaMinus } from 'react-icons/fa';

const ActivityTable = ({ activities, onDelete }) => {
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
                        {activities.indexOf(row.original) + 1} /{' '}
                        {activities.length}
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
            {
                Header: '',
                accessor: 'activity',
                Cell: ({ row }) => (
                    <IconButton
                        onClick={() => onDelete(row.original)}
                        className="shadow text-red-600 hover:bg-red-300 rounded-full w-8 h-8 bg-red-200"
                    >
                        <FaMinus />
                    </IconButton>
                ),
            },
        ],
        [onDelete, activities]
    );

    return <Table columns={columns} data={activities} />;
};

export default ActivityTable;
