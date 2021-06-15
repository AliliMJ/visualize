const Center = ({ children, col }) => {
  return (
    <div
      className={`${
        col ? 'flex flex-col' : 'flex'
      } items-center justify-center`}
    >
      {children}
    </div>
  );
};

export default Center;
