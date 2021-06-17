import Tabs from '../../../components/common/tabs';
const TabsAcceuil = ({ className }) => {
    const tabs = [
        { name: 'Projets', path: '/dashboard/acceuil/projets' },
        { name: 'Statistiques', path: '/dashboard/acceuil/statistiques' },
        { name: 'Finances', path: `/dashboard/acceuil/finances` },
        { name: 'Collecteurs', path: `/dashboard/acceuil/collecteurs` },
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
