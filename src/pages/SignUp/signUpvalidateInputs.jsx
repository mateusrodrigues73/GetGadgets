const validate = (
  nome,
  sobrenome,
  email,
  senha,
  confirmeSenha,
  setMessage,
  setMessageId
) => {
  const nomeRegex = /^[\p{L}]+(?:[\s][\p{L}]+)*$/u;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const senhaRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nome || !sobrenome || !email || !senha || !confirmeSenha) {
    setMessageId('cadastrar-fields-validate-warn');
    setMessage('Preencha todos os campos!');
    return false;
  }

  if (nome.length >= 30) {
    setMessageId('nome-validate-length-warn');
    setMessage('Nome deve ter menos de 30 caracteres!');
    return false;
  }

  if (!nomeRegex.test(nome)) {
    setMessageId('nome-validate-format-warn');
    setMessage('Nome possui formato Inválido!');
    return false;
  }

  if (sobrenome.length >= 70) {
    setMessageId('sobrenome-validate-length-warn');
    setMessage('Sobrenome deve ter menos de 50 caracteres!');
    return false;
  }

  if (!nomeRegex.test(sobrenome)) {
    setMessageId('sobrenome-validate-format-warn');
    setMessage('Sobrenomeome possui formato Inválido!');
    return false;
  }

  if (!emailRegex.test(email)) {
    setMessageId('cadastrar-email-format-warn');
    setMessage('E-mail possui formato inválido!');
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
