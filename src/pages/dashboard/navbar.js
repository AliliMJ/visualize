import { FaDoorOpen, FaRegBell } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { useAuth } from '../../hook/useAuth';
const Navbar = (props) => {
    const { logout } = useAuth();
    return (
        <div {...props}>
            <div className="flex flex-row-reverse items-center space-x-5 space-x-reverse">
                <div className="flex items-center space-x-0.5">
                    <div className="rounded-full w-10 h-10 bg-gray-400 mr-2"></div>
                    <div className="text-white font-bold text-sm">
                        Bonjour, MJ
                    </div>
                </div>
                <FaRegBell className="text-white h-5 w-5" />
                <FiMessageCircle className="text-white h-5 w-5" />
                <FaDoorOpen onClick={logout} className="text-red-500 h-5 w-5" />
            </div>
        </div>
    );
};

export default Navbar;
