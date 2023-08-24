const validate = (brand, model, price, quantity, setMessage, setMessageId) => {
  if (!brand || !model || !price || !quantity) {
    setMessage('Por favor preencha todos os campos');
    setMessageId('product-form-field-validate-warn');
    return false;
  }

  return true;
};

export default validate;
