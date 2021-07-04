import Tabs from '../../../components/common/tabs';
const TabsAcceuil = ({ className }) => {
    const tabs = [
        { name: 'Projets', path: '/dashboard/acceuil/projets' },
        { name: 'Notifications', path: '/dashboard/acceuil/notifications' },
    ];
    return (
        <Tabs
            tabs={tabs}
            className={className}
            activeClassName="text-blue-500 bg-blue-100 "
        />
    );
};

export default TabsAcceuil;
