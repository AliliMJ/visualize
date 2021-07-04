const SentInvitation = ({ invitation }) => {
    return (
        <div
            className={
                'py-3 px-4 border rounded  shadow flex justify-between items-center'
            }
        >
            <div className="flex space-x-2 items-center">
                <span>Vous avez invité {invitation.to_email} à</span>
                <span className="rounded-full bg-blue-400 font-bold text-white px-2">
                    {invitation.project}
                </span>
            </div>

            <div className="flex space-x-2 items-center">
                <span className="text-gray-400 mr-10">
                    Reçu {invitation.date}
                </span>
            </div>
        </div>
    );
};

export default SentInvitation;
