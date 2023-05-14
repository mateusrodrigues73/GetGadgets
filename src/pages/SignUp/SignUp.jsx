import { SignUpContainer, SignUpWrapper } from './SIgnUp.styles';
import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';
import AuthLink from '../../components/AuthLink';
import GradientButton from '../../components/GradientButton';

const SignUp = () => {
  const logar = () => {
    // TODO: implementar função de cadastrar usuário
  };

  return (
    <SignUpContainer>
      <AuthTitle title="Cadastre-se" />
      <AuthInput placeholder="Nome" />
      <AuthInput placeholder="Sobrenome" />
      <AuthInput placeholder="E-mail" />
      <AuthInput placeholder="Senha" />
      <AuthInput placeholder="Confirmação de senha" />
      <GradientButton
        width="220px"
        height="25px"
        text="Cadastrar"
        onClick={logar}
      />
      <SignUpWrapper>
        <AuthLink to="/entrar" text="Voltar" />
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default SignUp;
