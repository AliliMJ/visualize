import classNames from 'classnames';

const standarStyle =
    'flex self-stretch items-center space-x-2 px-3 py-2 rounded';

const IconButton = ({ className, name, children, ...props }) => {
    return (
        <button className={classNames(standarStyle, className)} {...props}>
            {children}
            {name && <div>{name}</div>}
        </button>
    );
};

export default IconButton;
