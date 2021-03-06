import Table from '../../../components/common/table';
import { useMemo } from 'react';
import { getClass, getRemarque } from '../../../helpers/states';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useProjects } from '../../../hook/useProjects';
import StateBadge from '../../projects/stateBadge';

const ProjectTable = () => {
    const columns = useMemo(
        () => [
            { Header: 'Code', accessor: 'docID' },
            {
                Header: 'Titre',
                accessor: 'title',
                Cell: ({ row }) => (
                    <Link
                        className="text-blue-500 underline"
                        to={`/projects/${row.original.docID}`}
                    >
                        {row.original.title}
                    </Link>
                ),
            },
            {
                Header: 'Etat',
                accessor: 'state',
                Cell: ({ row }) => <StateBadge degree={row.original.work} />,
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ row }) => (
                    <span className="text-gray-400 truncate ... w-10">
                        {row.original.description}
                    </span>
                ),
            },
        ],
        []
    );
    const projects = useProjects();

    return <Table columns={columns} data={projects} />;
};

export default ProjectTable;
