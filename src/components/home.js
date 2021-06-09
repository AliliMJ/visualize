import { useEffect, useState } from 'react';
import { database } from '../api/firebase';
import { useAuth } from '../hook/useAuth';

const Home = () => {
  const { logout, user } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      alert('Error:Could not logout.');
    }
  };

  useEffect(() => {
    return database.users
      .doc(user.uid)
      .onSnapshot((doc) => setUserInfo({ ...doc.data() }));
  }, [user.uid]);

  return (
    <div className="flex  items-center pt-20">
      <button
        className="text-red-500 rounded px-4 py-1 bg-transparent border-2 border-red-500"
        onClick={handleLogout}
      >
        Log out
      </button>

      <div className="w-5/6 flex ml-auto rounded  py-6 border bg-white">
        <div className="flex flex-col border-r px-10 h-max items-center w-min space-y-6">
          <div className="relative">
            <div className="rounded-full w-20 h-20 overflow-hidden flex items-center justify-center">
              <img
                className="object-cover h-full w-full"
                src="https://source.unsplash.com/random"
              />
            </div>
            <div className=" group absolute rounded-full w-8 h-8 bg-white flex items-center justify-center -bottom-1 -right-1">
              <div className=" group-hover:bg-gray-700 shadow rounded-full w-7 h-7 bg-white flex items-center justify-center ">
                <i
                  className="fa fa-camera group-hover:text-white"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
          <span className="text-xl font-bold w-max">
            {userInfo.firstName} {userInfo.lastName}
          </span>
          <span className="text-sm font-bold rounded  bg-gray-100 px-6 py-2">
            {userInfo.role}
          </span>
        </div>
        <div className="w-full h-full px-4 py-1 flex flex-col space-y-6">
          <h1 className="text-3xl">Données personnelles</h1>

          <hr />
          <div>
            <strong className="font-normal">Nom : </strong>
            <div className="text-gray-400">{userInfo.firstName}</div>
          </div>
          <div>
            <strong className="font-normal">Prénom : </strong>
            <div className="text-gray-400">{userInfo.lastName}</div>
          </div>
          <div>
            <strong className="font-normal">Adresse email : </strong>
            <div className="text-gray-400">{userInfo.email}</div>
          </div>
          <div>
            <strong className="font-normal">N° téléphone : </strong>
            <div className="text-gray-400">Aucun numéro ajouté.</div>
          </div>
          <div>
            <strong className="font-normal">Rôle : </strong>
            <div className="text-gray-400">{userInfo.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
