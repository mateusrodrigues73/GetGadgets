import { useContext } from 'react';

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
import GradientButton from '../../components/GradientButton';

import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
  const { session } = useContext(AuthContext);
  // eslint-disable-next-line no-console
  console.log(session);

  const logar = () => {
    // TODO: implementar função para logar usuário
  };

  return (
    <LoginContainer>
      <AuthTitle title="Fazer login" />
      <AuthInput placeholder="E-mail" />
      <AuthInput placeholder="Senha" />
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
        onClick={logar}
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
