import classNames from 'classnames';
import { getClass, getRemarque } from '../../helpers/states';

const StateBadge = ({ degree }) => {
    return (
        <span
            className={classNames(
                'rounded-full px-4 py-1 text-white',
                getClass(degree)
            )}
        >
            {getRemarque(degree)}
        </span>
    );
};

export default StateBadge;
