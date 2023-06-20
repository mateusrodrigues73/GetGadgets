import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import {
  UpdatePassContainer,
  PassInstructionsWrapper,
  PassInstructions,
} from './UpdatePassword.styles';

import AuthTitle from '../../components/AuthTitle';
import AuthPassInput from '../../components/AuthPassInput';
import AuthLink from '../../components/AuthLink/AuthLink';
import GradientButton from '../../components/GradientButton';
import Loader from '../../components/Loader';

import showToast from '../../utils/showToasts';

import validate from './UpdatePasswordValidateInputs';

import { AuthContext } from '../../contexts/AuthProvider';

const UpdatePassword = () => {
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [logout, setLogout] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword, setSessionUser } = useContext(AuthContext);
  const { confirmacao } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.hash.replace('#', ''));
  const error = params.get('error');

  const atualizar = async () => {
    if (isValid) {
      setIsLoading(true);
      await updatePassword(senha, logout);
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
        'Link inválido ou expirado! Tente enviar outro e-mail'
      );
      navigate('/recuperar-senha');
    } else if (confirmacao === 'validar-senha') {
      localStorage.clear();
      setSessionUser(null);
      setLogout(true);
    } else if (confirmacao === 'trocar-senha') {
      setLogout(false);
    } else {
      navigate('/');
    }
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
      {isFocused && (
        <PassInstructionsWrapper>
          <PassInstructions>Senha deve ter:</PassInstructions>
          <PassInstructions>Letras maiúsculas e minúsculas;</PassInstructions>
          <PassInstructions>
            Pelo menos um caractere especial (@ $!%*?&);
          </PassInstructions>
          <PassInstructions>Pelo menos um dígito numérico;</PassInstructions>
          <PassInstructions>No mínimo 8 caracteres;</PassInstructions>
          <PassInstructions>Nenhum espaço em branco.</PassInstructions>
        </PassInstructionsWrapper>
      )}
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
      {confirmacao === 'trocar-senha' && (
        <AuthLink text="Voltar" to="/perfil" />
      )}
      {isLoading && <Loader />}
    </UpdatePassContainer>
  );
};

export default UpdatePassword;
