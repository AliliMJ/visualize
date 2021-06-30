import ListElement from './extension/ListElement';
import { useAuth } from '../hook/useAuth';

const Projects = () => {
    const { projects } = useAuth();
    return (
        <div className="flex flex-col">
            {projects.map((project) => (
                <ListElement
                    key={project.id}
                    name={project.title}
                    state={project.state}
                    description={project.description}
                />
            ))}
        </div>
    );
};

export default Projects;
