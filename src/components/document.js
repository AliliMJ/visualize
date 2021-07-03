const Document = ({ name, url }) => {
    return (
        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div className="w-0 flex-1 flex items-center">
                <span className="ml-2 flex-1 w-0 truncate">{name}</span>
            </div>
            <div className="ml-4 flex-shrink-0">
                <a
                    href={url}
                    download
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Télécharger
                </a>
            </div>
        </li>
    );
};

export default Document;
