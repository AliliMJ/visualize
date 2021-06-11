import menu_selector from '../../svg/menu_selector.svg';
import { withWrapCondition } from '../../helpers/withWrapCondition';
const Selector = ({ children, size, className, ...props }) => {
  return (
    <div className={' flex items-center relative py-10'} {...props}>
      <div className="absolute">{children}</div>

      <img className="text-white -my-24" src={menu_selector} />
    </div>
  );
};

export default Selector;

export const EnhancedSelector = withWrapCondition(Selector);
