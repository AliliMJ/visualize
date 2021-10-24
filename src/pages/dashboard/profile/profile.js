import { FaCamera, FaInfoCircle } from 'react-icons/fa';
import { useInfo } from '../../../hook/useInfo';
const Title = () => {
    return (
        <div className="flex space-x-6 items-center col-span-full space-y-2 text-gray-400">
            <h1 className="text-3xl">Données personnelles</h1>
            <FaInfoCircle size="2rem" />
        </div>
    );
};

const ProfileCard = ({ avatar, firstName, lastName, role, className }) => (
    <div
        id="profile_card"
        className={`flex flex-col border rounded py-2 px-10 h-max items-center w-full  space-y-6 ${className}`}
    >
        <div className="relative">
            <div className="rounded-full w-20 h-20 overflow-hidden flex items-center justify-center">
                <img className="object-cover h-full w-full" src={avatar} />
            </div>
            <div className="absolute rounded-full w-8 h-8 bg-white flex items-center justify-center -bottom-1 -right-1">
                <div className=" hover:bg-gray-200 shadow rounded-full w-7 h-7 bg-white flex items-center justify-center ">
                    <FaCamera />
                </div>
            </div>
        </div>
        <span className="text-xl font-bold w-max">
            {firstName} {lastName}
        </span>
        <span className="text-sm font-bold rounded  bg-gray-100 px-6 py-2">
            {role}
        </span>
    </div>
);
const Info = ({ label, info, className }) => {
    return (
        <div className={className}>
            <strong className="font-normal">{label} : </strong>
            <div className="text-gray-400">{info}</div>
        </div>
    );
};
const Profile = ({ className }) => {
    const { firstName, lastName, role, email, avatar } = useInfo();

    return (
        <div
            name="container"
            className={
                className +
                ' grid grid-cols-1  md:grid-cols-2 w-full  gap-y-3 gap-x-6 '
            }
        >
            <Title />

            <ProfileCard
                className="row-start-2 md:row-span-5 justify-self-center"
                firstName={firstName}
                lastName={lastName}
                role={role}
                avatar={avatar}
            />

            <Info label="Nom" info={firstName} />
            <Info label="Prénom" info={lastName} />
            <Info label="Adresse email" info={email} />
            <Info label="N° téléphone" info="Aucun numéro ajouté." />
            <Info label="Rôle" info={role} />
        </div>
    );
};

export default Profile;
