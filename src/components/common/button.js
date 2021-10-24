const Button = ({ children, variation, ...props }) => (
  <button className={`rounded py-2 font-bold ${variation}`} {...props}>
    {children}
  </button>
);

export default Button;
