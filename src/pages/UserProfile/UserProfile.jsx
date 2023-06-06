import Breadcrumbs from '../../components/Breadcrumbs';

const UserProfile = () => {
  const string = '/\\Home|/perfil\\Perfil|/cadastro\\Cadastre-se';
  return <Breadcrumbs linksString={string} />;
};

export default UserProfile;
