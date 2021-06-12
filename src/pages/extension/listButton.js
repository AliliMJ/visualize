import classNames from 'classnames';

const standarStyle = 'flex self-stretch items-center space-x-2 p-2 rounded';

const ListButton = ({ className, name, children, ...props }) => {
  return (
    <button className={classNames(standarStyle, className)} {...props}>
      {children}
      <div>{name}</div>
    </button>
  );
};

export default ListButton;
