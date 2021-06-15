import illustration_visual_data from '../../svg/illustration_visual_data.svg';
import { Link } from 'react-router-dom';
import { PrimaryTitle, SecondaryTitle } from './welcomeTitles';
import Center from '../../components/common/center';

const Content = () => {
  return (
    <div className="md:grid md:grid-cols-2">
      <div className="flex justify-center">
        <img
          src={illustration_visual_data}
          alt="Illustration : visual data"
          className="max-w-md"
        />
      </div>
      <Center col>
        <PrimaryTitle />
        <SecondaryTitle />

        <Link
          to="/register"
          className="rounded py-3 px-9 font-bold bg-blue-500 text-white m-2"
        >
          Commencer
        </Link>
      </Center>
    </div>
  );
};

export default Content;
