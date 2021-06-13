import { useMemo } from 'react';
import { useAuth } from '../../hook/useAuth';
import Table from './table';

const CollectorTable = () => {
    const { collectors } = useAuth();
    const columns = useMemo(
        () => [
            { Header: 'Profile', accessor: 'profile' },
            { Header: 'Tel', accessor: 'phone' },
        ],
        []
    );
    const data = useMemo(
        () =>
            collectors.map((collector) => ({
                profile: (
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={`https://picsum.photos/id/${
                                    collector.id * 10
                                }/40`}
                                alt=""
                            />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                {collector.firstname} {collector.lastname}
                            </div>
                            <div className="text-sm text-gray-500">
                                {collector.email}
                            </div>
                        </div>
                    </div>
                ),
                ...collector,
            })),
        [collectors]
    );
    return <Table columns={columns} data={data} />;
};

export default CollectorTable;
