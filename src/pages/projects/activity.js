import { useEffect, useState } from 'react';
import { database } from '../../api/firebase';
import { JsonEditor as Editor } from 'jsoneditor-react';

const Activity = ({ match }) => {
    const [activity, setActivity] = useState({});
    useEffect(() => {
        return database.activities
            .doc(match.params.id)
            .get()
            .then((doc) => setActivity(doc.data()));
    }, []);
    return (
        <div>
            <Editor value={activity} />
        </div>
    );
};

export default Activity;
