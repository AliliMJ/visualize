import { useMemo } from 'react';
import Table from '../../components/common/table';
import defaultAvatar from '../../res/defaultAvatar.png';

const CollectorTable = ({ collectors }) => {
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
        ],
        []
    );

    return <Table columns={columns} data={collectors} />;
};

export default CollectorTable;
