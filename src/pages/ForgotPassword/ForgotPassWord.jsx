import { useState, useEffect, useContext } from 'react';

import {
  ForgotPassContainer,
  ForgotPassWrapper,
  Message,
} from './ForgotPassword.styles';

import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';
import AuthLink from '../../components/AuthLink';
import GradientButton from '../../components/GradientButton';
import Loader from '../../components/Loader';

import showToast from '../../utils/ShowToasts';

import { AuthContext } from '../../contexts/AuthProvider';

// TODO: verificar erros na rota

const ForgotPassWord = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { verifyEmail } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const validar = () => {
    if (email) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const recuperar = async () => {
    if (isValid) {
      setIsLoading(true);
      await verifyEmail(email);
      setIsLoading(false);
    } else {
      showToast('entrar-validate-warn', 'warn', 'Preencha o campo de e-mail!');
    }
  };

  useEffect(() => {
    validar();
  }, [email]);

  return (
    <ForgotPassContainer>
      <AuthTitle title="Recuperar senha" />
      <Message>
        Enviaremos as instruções para o seu e-mail já cadastrado
      </Message>
      <AuthInput placeholder="E-mail" type="email" setValue={setEmail} />
      <GradientButton
        width="220px"
        height="25px"
        text="Enviar e-mail"
        onClick={recuperar}
      />
      <ForgotPassWrapper>
        <AuthLink to="/entrar" text="Voltar" />
      </ForgotPassWrapper>
      {isLoading && <Loader />}
    </ForgotPassContainer>
  );
};

export default ForgotPassWord;
