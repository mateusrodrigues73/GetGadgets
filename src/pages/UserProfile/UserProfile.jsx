import {
  ProfileContainer,
  UserIconContainer,
  UserIconWrapper,
  UserIcon,
  InputContainer,
  InputName,
  Input,
  EditIcon,
} from './UserProfile.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import GradientButton from '../../components/GradientButton';
import CautionButton from '../../components/CautionButton';

const UserProfile = () => {
  const string = '/\\Home';

  const changePicture = () => {
    // TODO: implementar função para alterar foto do usuário
  };

  const changePassword = () => {
    // TODO: implementar função para alterar senha do usuário
  };

  const deleteProfile = () => {
    // TODO: implementar função para deletar perfil do usuário
  };

  const logOut = () => {
    // TODO: implementar função para deslogar usuário
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
        <InputContainer>
          <InputName>Nome:</InputName>
          <Input />
          <EditIcon />
        </InputContainer>
        <InputContainer>
          <InputName>Sobrenome:</InputName>
          <Input />
          <EditIcon />
        </InputContainer>
        <InputContainer>
          <InputName>E-mail:</InputName>
          <Input />
          <EditIcon />
        </InputContainer>
        <GradientButton
          width="377px"
          height="25px"
          text="Alterar senha"
          onClick={changePassword}
        />
        <CautionButton
          width="377px"
          height="25px"
          text="Sair"
          onClick={logOut}
          icon={false}
        />
        <CautionButton
          width="377px"
          height="25px"
          text="Deletar conta"
          onClick={deleteProfile}
          icon
        />
      </ProfileContainer>
      <SectionTitle title="Seus endereços" />
    </>
  );
};

export default UserProfile;
