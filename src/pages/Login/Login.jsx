import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {
  LoginContainer,
  LoginWrapper,
  CheckboxWrapper,
  Checkbox,
  CheckBoxText,
  OuContainer,
  OuLine,
  OuText,
} from './Login.styles';

import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';
import AuthLink from '../../components/AuthLink';
import AuthPassInput from '../../components/AuthPassInput';
import GradientButton from '../../components/GradientButton';
import Loader from '../../components/Loader';

import showToast from '../../utils/ShowToasts';

import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { sessionUser, signIn } = useContext(AuthContext);
  const { confirmacao } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.hash.replace('#', ''));
  const error = params.get('error');
  const errorDescription = params.get('error_description');

  const validar = () => {
    if (email && senha) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const entrar = async () => {
    if (isValid) {
      setIsLoading(true);
      await signIn(email, senha, isChecked);
      setIsLoading(false);
    } else {
      showToast('entrar-validate-warn', 'warn', 'Preencha todos os campos!');
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  useEffect(() => {
    validar();
  }, [email, senha]);

  useEffect(() => {
    if (sessionUser) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (error && errorDescription === 'Email link is invalid or has expired') {
      showToast('entrar-validate-error', 'error', 'Link inválido ou expirado');
    } else if (confirmacao && confirmacao === 'validar-email') {
      showToast(
        'entrar-validate-success',
        'success',
        'E-mail verificado, agora você pode logar com suas credenciais'
      );
    }
  }, []);

  return (
    <LoginContainer>
      <AuthTitle title="Fazer login" />
      <AuthInput placeholder="E-mail" type="email" setValue={setEmail} />
      <AuthPassInput placeholder="Senha" setValue={setSenha} />
      <CheckboxWrapper>
        <Checkbox
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <CheckBoxText onClick={handleCheckboxChange}>Lembre-me</CheckBoxText>
      </CheckboxWrapper>
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
      {isLoading && <Loader />}
    </LoginContainer>
  );
};

export default Login;
