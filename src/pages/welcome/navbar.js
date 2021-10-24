import logo from '../../svg/logo.svg';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="border-b px-3 py-4 w-full flex ">
      <Link to="/">
        <img src={logo} alt="Logo de visualize" className="w-20" />
      </Link>
      <div className="ml-auto self-center space-x-3">
        <Link
          to="/register"
          className="bg-black font-bold border rounded border-white  text-white shadow-sm px-6 p-2  flex-end"
        >
          Sign up
        </Link>

        <Link
          to="/login"
          className="bg-transparent border rounded font-bold text-black px-6 py-2"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
