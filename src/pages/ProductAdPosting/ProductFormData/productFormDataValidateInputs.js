const validate = (brand, model, price, quantity, setMessage, setMessageId) => {
  const quantityRegex = /^\d{1,4}$/;
  const brandModelRegex = /^(?!.*\s{2})[^\s].{0,48}[^\s]$/;

  if (!brand || !model || !price || !quantity) {
    setMessage('Por favor preencha todos os campos');
    setMessageId('product-form-fields-validate-warn');
    return false;
  }

  if (!brandModelRegex.test(brand)) {
    setMessage('Campo Marca possui formato inválido!');
    setMessageId('product-form-brand-format-validate-warn');
    return false;
  }

  if (!brandModelRegex.test(model)) {
    setMessage('Campo Modelo possui formato inválido!');
    setMessageId('product-form-model-format-validate-warn');
    return false;
  }

  if (!quantityRegex.test(quantity)) {
    setMessage('Campo Quantidade deve possuir apenas caracteres numéricos!');
    setMessageId('product-form-quantity-format-validate-warn');
    return false;
  }

  return true;
};

export default validate;
