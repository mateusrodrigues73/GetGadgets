const validate = (senha, confirmeSenha, setMessage, setMessageId) => {
  const senhaRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!senha || !confirmeSenha) {
    setMessageId('cadastrar-fields-validate-warn');
    setMessage('Preencha todos os campos!');
    return false;
  }

  if (!senhaRegex.test(senha)) {
    setMessageId('cadastrar-senha-format-warn');
    setMessage('Senha possui formato inválido!');
    return false;
  }

  if (senha !== confirmeSenha) {
    setMessageId('cadastrar-confirme-senha-validate-warn');
    setMessage('Senhas devem ser iguais!');
    return false;
  }
  return true;
};

export default validate;
