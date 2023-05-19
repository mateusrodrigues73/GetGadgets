import showToast from '../../utils/ShowToasts';

const validate = (nome, sobrenome, email, senha, confirmeSenha) => {
  const nomeRegex = /^[A-Za-z]{3,}(?:\s[A-Za-z]{3,})*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const senhaRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nome || !sobrenome || !email || !senha || !confirmeSenha) {
    showToast(
      'cadastrar-fields-validate-warn',
      'warn',
      'Preencha todos os campos!'
    );
    return false;
  }

  if (nome.length >= 30) {
    showToast(
      'nome-validate-length-warn',
      'warn',
      'Nome deve ter menos de 30 caracteres!'
    );
    return false;
  }

  if (!nomeRegex.test(nome)) {
    showToast(
      'nome-validate-format-warn',
      'warn',
      'Nome possui formato Inválido!'
    );
    return false;
  }

  if (sobrenome.length >= 50) {
    showToast(
      'sobrenome-validate-length-warn',
      'warn',
      'Sobrenome deve ter menos de 50 caracteres!'
    );
    return false;
  }

  if (!nomeRegex.test(sobrenome)) {
    showToast(
      'sobrenome-validate-format-warn',
      'warn',
      'Sobrenomeome possui formato Inválido!'
    );
    return false;
  }

  if (!emailRegex.test(email)) {
    showToast(
      'cadastrar-email-format-warn',
      'warn',
      'E-mail possui formato inválido!'
    );
    return false;
  }

  if (!senhaRegex.test(senha)) {
    showToast(
      'cadastrar-senha-format-warn',
      'warn',
      'Senha possui formato inválido'
    );
    return false;
  }

  if (senha !== confirmeSenha) {
    showToast(
      'cadastrar-confirme-senha-validate-warn',
      'warn',
      'Senhas devem ser iguais!'
    );
    return false;
  }
  showToast('cadastrar-confirme-senha-validate-warn', 'warn', 'válido!');
  return true;
};

export default validate;
