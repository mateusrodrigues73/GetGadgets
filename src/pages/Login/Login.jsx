import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LoginContainer,
  LoginWrapper,
  Checkbox,
  CheckBoxText,
  OuContainer,
  OuLine,
  OuText,
} from './Login.styles';

import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';
import AuthLink from '../../components/AuthLink';
import AuthPassInput from '../../components/AuthPassInput/AuthPassInput';
import GradientButton from '../../components/GradientButton';

import showToast from '../../utils/ShowToasts';

import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isValid, setisValid] = useState(false);
  const { session, signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const validar = () => {
    if (email && senha) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  };

  const entrar = async () => {
    if (isValid) {
      await signIn(email, senha);
    } else {
      showToast(
        'entrar-validate-warn',
        'warn',
        'Preencha todos os campos!',
        'colored'
      );
    }
  };

  useEffect(() => {
    validar();
  }, [email, senha]);

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, []);

  return (
    <LoginContainer>
      <AuthTitle title="Fazer login" />
      <AuthInput placeholder="E-mail" type="email" setValue={setEmail} />
      <AuthPassInput placeholder="Senha" setValue={setSenha} />
      <LoginWrapper>
        <Checkbox type="checkbox" />
        <CheckBoxText>Lembre-me</CheckBoxText>
      </LoginWrapper>
      <LoginWrapper>
        <AuthLink to="/recuperar-senha" text="Esqueceu sua senha?" />
      </LoginWrapper>
      <GradientButton
        width="220px"
        height="25px"
        text="Entrar"
        onClick={entrar}
      />
      <OuContainer>
        <OuLine />
        <OuText>ou</OuText>
        <OuLine />
      </OuContainer>
      <LoginWrapper>
        <AuthLink to="/cadastro" text="Cadastre-se" />
      </LoginWrapper>
      <LoginWrapper>
        <AuthLink to="/" text="Voltar para a home" />
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
