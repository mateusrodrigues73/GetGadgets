import {
  ForgotPassContainer,
  ForgotPassWrapper,
  Message,
} from './ForgotPassword.styles';
import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';
import AuthLink from '../../components/AuthLink';
import GradientButton from '../../components/GradientButton';

const ForgotPassWord = () => {
  const recuperar = () => {
    // TODO: implementar função para enviar e-mail de confirmação de senha
  };

  return (
    <ForgotPassContainer>
      <AuthTitle title="Recuperar senha" />
      <Message>
        Enviaremos as instruções para o seu e-mail já cadastrado
      </Message>
      <AuthInput placeholder="Seu e-mail" />
      <GradientButton
        width="220px"
        height="25px"
        text="Enviar e-mail"
        onClick={recuperar}
      />
      <ForgotPassWrapper>
        <AuthLink to="/entrar" text="Voltar" />
      </ForgotPassWrapper>
    </ForgotPassContainer>
  );
};

export default ForgotPassWord;
