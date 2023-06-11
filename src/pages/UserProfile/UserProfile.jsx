import {
  ProfileContainer,
  UserIconContainer,
  UserIconWrapper,
  UserIcon,
} from './UserProfile.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import GradientButton from '../../components/GradientButton';

const UserProfile = () => {
  const string = '/\\Home';

  const changePicture = () => {
    // TODO: implementar função para alterar foto do usuário
  };

  return (
    <>
      <Breadcrumbs linksString={string} actualPage="Perfil" />
      <SectionTitle title="Seus dados" />
      <ProfileContainer>
        <UserIconContainer>
          <UserIconWrapper>
            <UserIcon />
          </UserIconWrapper>
          <GradientButton
            width="170px"
            height="25px"
            text="Enviar foto"
            onClick={changePicture}
          />
        </UserIconContainer>
      </ProfileContainer>
      <SectionTitle title="Seus endereços" />
    </>
  );
};

export default UserProfile;
