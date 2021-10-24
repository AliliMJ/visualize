import { useMemo } from 'react';
import { FaMinus } from 'react-icons/fa';
import IconButton from '../../components/common/iconButton';
import Table from '../../components/common/table';
import defaultAvatar from '../../res/defaultAvatar.png';

const CollectorTable = ({ collectors, onDelete }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Profile',
                accessor: 'profile',
                Cell: ({ row }) => (
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={row.original.avatar || defaultAvatar}
                                alt=""
                            />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                {row.original.firstName} {row.original.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                                {row.original.email}
                            </div>
                        </div>
                    </div>
                ),
            },
            { Header: 'Tel', accessor: 'phone' },
            {
                Header: '',
                accessor: 'collector',
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
        [onDelete]
    );

    return <Table columns={columns} data={collectors} />;
};

export default CollectorTable;
