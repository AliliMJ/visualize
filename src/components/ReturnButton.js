import IconButton from './common/iconButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ReturnButton = ({ history, right }) => {
    return (
        <IconButton
            className="text-gray-500 space-x-2"
            onClick={() => history.push('/dashboard')}
        >
            {!right && <FaArrowLeft />}
            <span>Retour</span>
            {right && <FaArrowRight />}
        </IconButton>
    );
};

export default ReturnButton;
