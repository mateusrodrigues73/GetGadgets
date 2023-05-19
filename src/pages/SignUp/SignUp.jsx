import { useState } from 'react';

import {
  SignUpContainer,
  SignUpWrapper,
  PassInstructionsWrapper,
  PassInstructions,
} from './SIgnUp.styles';

import AuthTitle from '../../components/AuthTitle';
import AuthInput from '../../components/AuthInput';
import AuthLink from '../../components/AuthLink';
import AuthPassInput from '../../components/AuthPassInput/AuthPassInput';
import GradientButton from '../../components/GradientButton';

import validate from './validateInputs';

// TODO: fixar states dos inputs

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isValid, setIsValid] = useState(false);

  const cadastrar = () => {
    setIsValid(validate(nome, sobrenome, email, senha, confirmeSenha));
  };

  return (
    <SignUpContainer>
      <AuthTitle title="Cadastre-se" />
      <AuthInput placeholder="Nome" type="text" setValue={setNome} />
      <AuthInput placeholder="Sobrenome" type="text" setValue={setSobrenome} />
      <AuthInput placeholder="E-mail" type="email" setValue={setEmail} />
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
          <PassInstructions>Pelo menos um dígito;</PassInstructions>
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
        text="Cadastrar"
        onClick={cadastrar}
      />
      <SignUpWrapper>
        <AuthLink to="/entrar" text="Voltar" />
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default SignUp;
