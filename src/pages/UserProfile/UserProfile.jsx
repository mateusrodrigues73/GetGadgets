import { useState, useEffect, useContext } from 'react';

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

import { AuthContext } from '../../contexts/AuthProvider';

const UserProfile = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const { sessionUser } = useContext(AuthContext);
  const linksString = '/\\Home';

  const handleNameChange = (event) => {
    setNome(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setSobrenome(event.target.value);
  };

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

  useEffect(() => {
    if (sessionUser) {
      setNome(sessionUser.nome);
      setSobrenome(sessionUser.sobrenome);
    }
  }, []);

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Perfil" />
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
          <Input type="text" value={nome} onChange={handleNameChange} />
          <EditIcon />
        </InputContainer>
        <InputContainer>
          <InputName>Sobrenome:</InputName>
          <Input
            type="text"
            value={sobrenome}
            onChange={handleLastNameChange}
          />
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
    </>
  );
};

export default UserProfile;
