export const validateData = (
  titulo,
  marca,
  modelo,
  preco,
  quantidade,
  setMessage,
  setMessageId
) => {
  const Titleregex = /^(?!.* {2})(?=.*\S)[\s\S]{10,80}$/;
  const brandModelRegex = /^(?!.*\s{2})[^\s].{0,48}[^\s]$/;

  if (!titulo || !marca || !modelo || !preco || !preco || !quantidade) {
    setMessage('Por favor preencha todos os campos');
    setMessageId('post-edit-validate-data');
    return false;
  }

  if (!Titleregex.test(titulo)) {
    setMessage('Título possui formato inválido!');
    setMessageId('post-edit-title-format-warn');
    return false;
  }

  if (!brandModelRegex.test(modelo)) {
    setMessage('Campo Marca possui formato inválido!');
    setMessageId('post-edit-brand-format-warn');
    return false;
  }

  if (!brandModelRegex.test(modelo)) {
    setMessage('Campo Modelo possui formato inválido!');
    setMessageId('post-edit-model-format-warn');
    return false;
  }

  return true;
};

export const validateSpec = (spec, setMessage, setMessageId) => {
  const regex = /^(?!.*\s{2})[^\s].{0,48}[^\s]$/;

  if (spec === '') {
    setMessage('Por favor preencha o campo de especificação');
    setMessageId('product-spec-field-warn');
    return false;
  }

  if (!regex.test(spec)) {
    setMessage('Especificação possui um formato inválido!');
    setMessageId('product-form-specs-validate-warn');
    return false;
  }

  return true;
};
