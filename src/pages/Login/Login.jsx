import { LoginContainer } from './Login.styles';
import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';

const Login = () => (
  <LoginContainer>
    <AuthTitle title="Fazer login" />
    <AuthInput placeholder="E-mail" />
  </LoginContainer>
);

export default Login;
