const MokLogic = () => {
    const project = { docID: 0, title: 'Mok' };
    const collectors = [{ docID: 1, email: 'ahah' }];
    const handleDelete = (collector) =>
        console.log(collectors.includes(collector));
    const activities = [];

    return {
        project,
        collectors,
        activities,
        owner: 1,
        collectorModal: false,
        setCollectorModal: () => {},
        handleAddCollector: () => {},
        handleDelete,
    };
};

export default MokLogic;
