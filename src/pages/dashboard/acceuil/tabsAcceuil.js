import Tabs from '../../../components/common/tabs';
const TabsAcceuil = () => {
    const tabs = [
        { name: 'Projets', path: '/dashboard/acceuil/projets' },
        { name: 'Statistiques', path: '/dashboard/acceuil/statistiques' },
        { name: 'Finances', path: `/dashboard/acceuil/finances` },
        { name: 'Collecteurs', path: `/dashboard/acceuil/collecteurs` },
    ];
    return <Tabs tabs={tabs} activeClassName="text-blue-500 border-blue-500" />;
};

export default TabsAcceuil;
