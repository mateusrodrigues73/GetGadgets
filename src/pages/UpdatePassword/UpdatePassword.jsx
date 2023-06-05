import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import {
  UpdatePassContainer,
  PassInstructionsWrapper,
  PassInstructions,
} from './UpdatePassword.styles';

import AuthTitle from '../../components/AuthTitle';
import AuthPassInput from '../../components/AuthPassInput';
import GradientButton from '../../components/GradientButton';
import Loader from '../../components/Loader';

import showToast from '../../utils/ShowToasts';

import validate from './UpdatePasswordValidateInputs';

import { AuthContext } from '../../contexts/AuthProvider';

const UpdatePassword = () => {
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword } = useContext(AuthContext);
  const { confirmacao } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.hash.replace('#', ''));
  const error = params.get('error');

  const atualizar = async () => {
    if (isValid) {
      setIsLoading(true);
      await updatePassword(senha);
      setIsLoading(false);
    } else {
      showToast(messageId, 'warn', message);
    }
  };

  useEffect(() => {
    if (error) {
      showToast(
        'update-pass-validate-error',
        'error',
        'Link inválido ou expirado, tente enviar outro e-mail'
      );
      navigate('/');
    } else if (!confirmacao || confirmacao !== 'validar-senha') {
      navigate('/');
    }

    return () => {
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    setIsValid(validate(senha, confirmeSenha, setMessage, setMessageId));
  }, [senha, confirmeSenha]);

  return (
    <UpdatePassContainer>
      <AuthTitle title="Atualizar senha" />
      <AuthPassInput
        placeholder="Insira uma senha"
        setValue={setSenha}
        passFocus={setIsFocused}
      />
      {isFocused ? (
        <PassInstructionsWrapper>
          <PassInstructions>Senha deve ter:</PassInstructions>
          <PassInstructions>Letras maiúsculas e minúsculas;</PassInstructions>
          <PassInstructions>Pelo menos um caractere especial;</PassInstructions>
          <PassInstructions>Pelo menos um dígito numérico;</PassInstructions>
          <PassInstructions>No mínimo 8 caracteres;</PassInstructions>
          <PassInstructions>Nenhum espaço em branco.</PassInstructions>
        </PassInstructionsWrapper>
      ) : null}
      <AuthPassInput
        placeholder="Confirme sua senha"
        setValue={setConfirmeSenha}
      />
      <GradientButton
        width="220px"
        height="25px"
        text="Atualizar"
        onClick={atualizar}
      />
      {isLoading && <Loader />}
    </UpdatePassContainer>
  );
};

export default UpdatePassword;
