import { useTable } from 'react-table';

const Table = ({ columns, data }) => {
    const tableInstance = useTable({ columns, data });
    const {
        getTableProps,

        getTableBodyProps,

        headerGroups,

        rows,

        prepareRow,
    } = tableInstance;
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table
                            className="min-w-full divide-y divide-gray-200"
                            {...getTableProps()}
                        >
                            <thead className="bg-gray-50">
                                {headerGroups.map((headerGroup, index) => (
                                    <tr key={index}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                key={column.id}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody
                                className="bg-white divide-y divide-gray-200"
                                {...getTableBodyProps()}
                            >
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td
                                                    // key={`${cell.row.id}`}
                                                    className="px-6 py-4 whitespace-nowrap"
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
