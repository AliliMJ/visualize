import menu_selector from '../../svg/menu_selector.svg';
import { withWrapCondition } from '../../helpers/withWrapCondition';
const Selector = ({ children, size, className, ...props }) => {
  return (
    <div className={'flex items-center relative py-6'} {...props}>
      <div className="absolute">{children}</div>

      <img className="text-white -my-28" src={menu_selector} />
    </div>
  );
};

export default Selector;

export const EnhancedSelector = withWrapCondition(Selector);
