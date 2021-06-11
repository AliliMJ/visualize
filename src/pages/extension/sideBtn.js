import { EnhancedSelector } from '../../components/common/selector';
import { Link } from 'react-router-dom';

//adds to a component a condition property to render with his children or render his children only.

const SideBtn = ({ selected, name, path, icon, onClick }) => {
  return (
    <EnhancedSelector condition={selected}>
      <div
        className={`flex items-center  px-6 space-x-3 p-3 text-white z-20 ${
          selected && 'text-blue-500 z-10'
        }`}
      >
        {icon({
          className: `w-4 ${selected ? 'text-blue-500' : 'text-white'}`,
        })}
        <Link to={path}>{name}</Link>
      </div>
    </EnhancedSelector>
  );
};

export default SideBtn;
