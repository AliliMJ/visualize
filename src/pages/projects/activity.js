import { useEffect, useState } from 'react';
import { database } from '../../api/firebase';
import ReactJson from 'react-json-view';

const Activity = ({ match }) => {
    const [activity, setActivity] = useState({});
    useEffect(() => {
        return database.activities
            .doc(match.params.id)
            .get()
            .then((doc) => setActivity(doc.data()));
    }, [match.params.id]);
    return (
        <div className="p-4">
            <div className="px-10 py-3 shadow  rounded border">
                <ReactJson
                    src={activity}
                    displayObjectSize={false}
                    displayDataTypes={false}
                    enableClipboard={false}
                    onAdd={() => {}}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    iconStyle="circle"
                />
            </div>
        </div>
    );
};

export default Activity;
