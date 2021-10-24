import classNames from 'classnames';
import { FaCheck, FaTimes } from 'react-icons/fa';
import IconButton from './common/iconButton';

const Demande = ({ notification, accept, decline }) => {
    return (
        <div
            className={classNames(
                'py-3 px-4 border rounded  shadow flex justify-between items-center',
                {
                    'bg-green-200': notification.state === 'accepted',
                },
                {
                    'bg-red-200': notification.state === 'declined',
                }
            )}
        >
            <div className="flex space-x-2 items-center">
                <span
                    className={classNames(
                        { 'text-green-500': notification.state === 'accepted' },
                        { 'text-red-500': notification.state === 'declined' }
                    )}
                >
                    {notification.message}
                </span>
                <span className="rounded-full bg-blue-400 font-bold text-white px-2">
                    {notification.project}
                </span>
            </div>

            <div className="flex space-x-2 items-center">
                <span className="text-gray-400 mr-10">
                    Reçu {notification.date}
                </span>
                {notification.type === 'invitation' &&
                    notification.state === 'pending' && (
                        <div className="flex space-x-3">
                            <IconButton
                                className="bg-green-500 text-white  shadow"
                                onClick={() => accept(notification)}
                            >
                                <FaCheck />
                            </IconButton>
                            <IconButton
                                className="text-red-500 shadow"
                                onClick={() => decline(notification)}
                            >
                                <FaTimes />
                            </IconButton>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Demande;
