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

import showToast from '../../utils/showToasts';
import imageValidate from '../../utils/ImageValidate';

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
  const { sessionUser, signOut } = useContext(AuthContext);
  const { updateUser, uploadPicture } = useContext(UserContext);
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
        await updateUser({ nome });
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
        await updateUser({ sobrenome });
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
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (imageValidate(file)) {
        setIsLoading(true);
        await uploadPicture(file);
        setIsLoading(false);
      }
    });
    fileInput.click();
  };

  const changePassword = () => {
    // TODO: implementar função para alterar senha do usuário
    showToast('changePassword-warn', 'warn', 'Em breve!');
  };

  const deleteProfile = () => {
    // TODO: implementar função para deletar perfil do usuário
    showToast('deleteProfile-warn', 'warn', 'Em breve!');
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
          onClick={signOut}
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
