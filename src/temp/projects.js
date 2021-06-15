// import ListElement from './extension/ListElement';
// import { useAuth } from '../hook/useAuth';
// import IconButton from './extension/iconButton';
// import { FaPlus } from 'react-icons/fa';
// const Projects = () => {
//     const { projects } = useAuth();
//     return (
//         <div className="flex flex-col space-y-2">
//             <IconButton
//                 name="Ajouter"
//                 className="text-white bg-green-400 hover:bg-green-500 w-min"
//             >
//                 <FaPlus />
//             </IconButton>
//             <div>
//                 {projects.map((project) => (
//                     <ListElement
//                         key={project.id}
//                         name={project.title}
//                         state={project.state}
//                         description={project.description}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Projects;
