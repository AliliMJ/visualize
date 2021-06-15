import { Link } from 'react-router-dom';
const Footer = () => (
  <>
    {/* <div className="col-span-full text-xs  md:text-sm text-center text-gray-400">
      En s'inscrivant, vous acceptez nos{' '}
      <span className="underline">Terms</span> et{' '}
      <span className="underline">Conditions</span> .
    </div> */}
    <div className="text-xs md:text-sm text-gray-400 col-span-full text-center">
      Disposez-vous déja d'un compte?{' '}
      <Link to="/login" className="text-blue-500 underline">
        S'authentifier
      </Link>
    </div>
  </>
);

export default Footer;
