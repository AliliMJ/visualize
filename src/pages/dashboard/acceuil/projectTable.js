import { useAuth } from '../../../hook/useAuth';
import Table from '../../../components/common/table';
import { useMemo } from 'react';
import { getClass, getRemarque } from '../../../helpers/states';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const ProjectTable = () => {
    const columns = useMemo(
        () => [
            { Header: 'Code', accessor: 'id' },
            { Header: 'Titre', accessor: 'title' },
            { Header: 'Etat', accessor: 'state' },
            { Header: 'Description', accessor: 'description' },
        ],
        []
    );
    const { projects } = useAuth();

    const data = useMemo(
        () =>
            projects.map((project) => {
                const cell = { ...project };
                cell.state = (
                    <span
                        className={classNames(
                            'rounded-full px-4 py-1 text-white',
                            getClass(cell.state)
                        )}
                    >
                        {getRemarque(cell.state)}
                    </span>
                );
                cell.description = (
                    <span className="text-gray-400 truncate ... w-10">
                        {cell.description}
                    </span>
                );
                cell.title = (
                    <Link
                        to={`/projects/${project.id}`}
                        className="text-blue-500 underline"
                    >
                        {cell.title}
                    </Link>
                );

                return cell;
            }),
        [projects]
    );

    return <Table columns={columns} data={data} />;
};

export default ProjectTable;
