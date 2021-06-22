import classNames from 'classnames';
import { getClass, getRemarque } from '../../helpers/states';

const StateBadge = ({ state }) => {
    return (
        <span
            className={classNames(
                'rounded-full px-4 py-1 text-white',
                getClass(state)
            )}
        >
            {getRemarque(state)}
        </span>
    );
};

export default StateBadge;
