const validate = (nome, sobrenome, setMessage, setMessageId) => {
  const nomeRegex = /^[\p{L}]+(?:[\s][\p{L}]+)*$/u;

  if (nome === '') {
    setMessageId('cadastrar-fields-validate-warn');
    setMessage('Campo nome não pode estar vazio!');
    return false;
  }

  if (sobrenome === '') {
    setMessageId('cadastrar-fields-validate-warn');
    setMessage('Campo sobrenome não pode estar vazio!');
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

  if (sobrenome.length >= 50) {
    setMessageId('sobrenome-validate-length-warn');
    setMessage('Sobrenome deve ter menos de 50 caracteres!');
    return false;
  }

  if (!nomeRegex.test(sobrenome)) {
    setMessageId('sobrenome-validate-format-warn');
    setMessage('Sobrenomeome possui formato Inválido!');
    return false;
  }

  return true;
};

export default validate;
