import {
  LoginContainer,
  CheckBoxContainer,
  Checkbox,
  CheckBoxText,
  ForgotPassContainer,
} from './Login.styles';
import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';
import AuthLink from '../../components/AuthLink';
import GradientButton from '../../components/GradientButton';

const Login = () => {
  const logar = () => {
    // TODO: implementar função para logar usuário
  };

  return (
    <LoginContainer>
      <AuthTitle title="Fazer login" />
      <AuthInput placeholder="E-mail" />
      <AuthInput placeholder="Senha" />
      <CheckBoxContainer>
        <Checkbox type="checkbox" />
        <CheckBoxText>Lembre-me</CheckBoxText>
      </CheckBoxContainer>
      <ForgotPassContainer>
        <AuthLink to="/" text="Esqueceu sua senha?" />
      </ForgotPassContainer>
      <GradientButton
        width="220px"
        height="25px"
        text="Entrar"
        onClick={logar}
      />
    </LoginContainer>
  );
};

export default Login;
