import { FaCheck, FaTimes } from 'react-icons/fa';
import IconButton from './common/iconButton';

const Demande = ({ notification, accept, decline }) => {
    return (
        <div className="py-3 px-4 border rounded  shadow flex justify-between items-center">
            <div className="flex space-x-2">
                <span>{notification.message}</span>
                <span className="rounded-full bg-blue-400 font-bold text-white px-2">
                    {notification.project}
                </span>
            </div>

            <div className="flex space-x-2 items-center">
                <span className="text-gray-400 mr-10">
                    Reçu il y'a 7 mintues
                </span>
                <IconButton
                    className="bg-green-500 text-white  shadow"
                    onClick={accept}
                >
                    <FaCheck />
                </IconButton>
                <IconButton className="text-red-500 shadow" onClick={decline}>
                    <FaTimes />
                </IconButton>
            </div>
        </div>
    );
};

export default Demande;
