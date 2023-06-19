import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ProfileContainer,
  UserIconContainer,
  UserIconWrapper,
  UserIcon,
  UserImage,
  UserIconButtonsContainer,
  InputContainer,
  InputName,
  Input,
  EditIcon,
} from './UserProfile.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import GradientButton from '../../components/GradientButton';
import CautionButton from '../../components/CautionButton';
import Alert from '../../components/Alert/Alert';
import Loader from '../../components/Loader';

import showToast from '../../utils/showToasts';
import imageValidate from '../../utils/imageValidate';

import validate from './UserProfileValidateInputs';

import { AuthContext } from '../../contexts/AuthProvider';
import { UserContext } from '../../contexts/UserProvider';

const UserProfile = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [isAlerting, setIsAlerting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { sessionUser, signOut } = useContext(AuthContext);
  const { updateUser, uploadPicture, deletePicture } = useContext(UserContext);
  const navigate = useNavigate();
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

  const removePicture = async () => {
    setIsLoading(true);
    await deletePicture();
    setIsLoading(false);
  };

  const changePassword = () => {
    // TODO: implementar função para alterar senha do usuário
    showToast('changePassword-warn', 'warn', 'Em breve!');
  };

  const setAlertTrue = () => {
    setIsAlerting(true);
  };

  const deleteProfile = () => {
    // TODO: implementar função para deletar perfil do usuário
    showToast('deleteProfile-warn', 'warn', 'Continuou');
    setIsAlerting(false);
  };

  const cancelDeleteProfile = () => {
    setIsAlerting(false);
  };

  useEffect(() => {
    if (sessionUser) {
      setNome(sessionUser.nome);
      setSobrenome(sessionUser.sobrenome);
    } else {
      navigate('/entrar');
    }
  }, [sessionUser]);

  useEffect(() => {
    setIsValid(validate(nome, sobrenome, setMessage, setMessageId));
  }, [nome, sobrenome]);

  return (
    sessionUser && (
      <>
        <Breadcrumbs linksString={linksString} actualPage="Perfil" />
        <SectionTitle title="Seus dados" />
        <ProfileContainer>
          <UserIconContainer>
            <UserIconWrapper>
              {sessionUser.imagem === 'no_image' ? (
                <UserIcon />
              ) : (
                <UserImage src={sessionUser.imagem} alt="Imagem de perfil" />
              )}
            </UserIconWrapper>
            <UserIconButtonsContainer>
              <GradientButton
                width="170px"
                height="25px"
                text="Enviar foto"
                onClick={changePicture}
              />
              {sessionUser.imagem !== 'no_image' && (
                <CautionButton
                  width="170px"
                  height="25px"
                  text="Deletar foto"
                  onClick={removePicture}
                  icon
                />
              )}
            </UserIconButtonsContainer>
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
            onClick={setAlertTrue}
            icon
          />
        </ProfileContainer>
        {isAlerting && (
          <Alert
            message="Sua conta será excluída permanentemente! Deseja continuar?"
            onCancel={cancelDeleteProfile}
            onContinue={deleteProfile}
          />
        )}
        {isLoading && <Loader />}
      </>
    )
  );
};

export default UserProfile;
