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
import Loader from '../../components/Loader';

import showToast from '../../utils/ShowToasts';

import validate from './UserProfileValidateInputs';

import { AuthContext } from '../../contexts/AuthProvider';
import { UserContext } from '../../contexts/UserProvider';

const UserProfile = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { sessionUser } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);
  const linksString = '/\\Home';

  const handleNameChange = (event) => {
    setNome(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setSobrenome(event.target.value);
  };

  const updateName = async () => {
    if (sessionUser.nome !== nome) {
      if (isValid) {
        setIsLoading(true);
        await updateUser({ nome }, sessionUser.id);
        setIsLoading(false);
      } else {
        showToast(messageId, 'warn', message);
      }
    } else {
      showToast(
        'update-name-validate-warn',
        'warn',
        'Insira um nome diferente do atual!'
      );
    }
  };

  const updateLastName = async () => {
    if (sessionUser.sobrenome !== sobrenome) {
      if (isValid) {
        setIsLoading(true);
        await updateUser({ sobrenome }, sessionUser.id);
        setIsLoading(false);
      } else {
        showToast(messageId, 'warn', message);
      }
    } else {
      showToast(
        'update-lastname-validate-warn',
        'warn',
        'Insira um sobrenome diferente do atual!'
      );
    }
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
  }, [sessionUser]);

  useEffect(() => {
    setIsValid(validate(nome, sobrenome, setMessage, setMessageId));
  }, [nome, sobrenome]);

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
          <EditIcon onClick={updateName} />
        </InputContainer>
        <InputContainer>
          <InputName>Sobrenome:</InputName>
          <Input
            type="text"
            value={sobrenome}
            onChange={handleLastNameChange}
          />
          <EditIcon onClick={updateLastName} />
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
      {isLoading && <Loader />}
    </>
  );
};

export default UserProfile;
