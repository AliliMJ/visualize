import Radio from '../../components/common/Radio';
import illustration_collector from '../../svg/illustration_collector.svg';
import illustration_supervisor from '../../svg/illustration_supervisor.svg';
import Card from '../../components/common/card';

const RoleChoise = () => {
  return (
    <div className="col-span-full flex justify-center space-x-2">
      <Radio name="role" value="collecteur">
        <Card
          src={illustration_collector}
          title="Collecteur"
          description="Vous collecter des données du projet (e.g. évenements, état
                  d'avancement...)."
        />
      </Radio>
      <Radio name="role" value="superviseur">
        <Card
          src={illustration_supervisor}
          title="Superviseur"
          description="Vous créer et gérer vos projets."
        />
      </Radio>
    </div>
  );
};

export default RoleChoise;
