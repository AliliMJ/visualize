export const withWrapCondition = (Component) => {
  return ({ condition, children, ...props }) =>
    condition ? <Component {...props}>{children}</Component> : children;
};
