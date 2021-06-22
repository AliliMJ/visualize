import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { TiDocumentText } from 'react-icons/ti';
import { MdPersonOutline } from 'react-icons/md';
import { FaBullhorn } from 'react-icons/fa';
import SidebarButton from './sidebarButton';
import { useLocation } from 'react-router-dom';
import IconButton from '../../components/common/iconButton';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '../../hook/useAuth';

function Sidebar({ className }) {
    const buttons = [
        {
            id: 'acceuil',
            name: 'Acceuil',
            icon: function (props) {
                return <AiFillHome {...props} />;
            },
            path: '/dashboard/acceuil',
        },
        {
            id: 'carte',
            name: 'Carte',
            icon: function ({ ...props }) {
                return <FiMapPin {...props} />;
            },
            path: '/dashboard/carte',
        },
        {
            id: 'documents',
            name: 'Documents',
            icon: function ({ ...props }) {
                return <TiDocumentText {...props} />;
            },
            path: '/dashboard/documents',
        },
        {
            id: 'profile',
            name: 'Profil',
            icon: function ({ ...props }) {
                return <MdPersonOutline {...props} />;
            },
            path: '/dashboard/profile',
        },
        {
            id: 'support',
            name: 'Support',
            icon: function ({ ...props }) {
                return <FaBullhorn {...props} />;
            },
            path: '/dashboard/support',
        },
    ];

    const location = useLocation();
    const { logout } = useAuth();

    return (
        <div>
            <div
                className={`flex flex-col py-20 space-y-3 h-full ${className}`}
            >
                {buttons.map((button) => (
                    <SidebarButton
                        key={button.id}
                        path={button.path}
                        selected={location.pathname.startsWith(button.path)}
                        name={button.name}
                        icon={button.icon}
                    />
                ))}
            </div>
            <div className="w-full flex justify-center">
                <IconButton
                    className="mt-auto bg-red-500 text-white"
                    onClick={() => logout()}
                >
                    <BiLogOut />
                    <span>Sortir</span>
                </IconButton>
            </div>
        </div>
    );
}

export default Sidebar;

// {buttons.map((btn, index) => (
//   <div key={index}>
//     <SidebarButton
//       selected={buttons[selected].idx === index}
//       name={btn.name}
//       icon={btn.icon({
//         color: buttons[selected].idx === index ? 'blue' : 'white',
//         size: 30,
//       })}
//       click={() => toggle(index)}
//     />
//   </div>
// ))}
