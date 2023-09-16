import showToast from './showToasts';

const imageValidate = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSizeInBytes = 1 * 1024 * 1024; // 1MB

  if (!allowedTypes.includes(file.type)) {
    showToast(
      'file-type-error',
      'error',
      'Escolha uma imagem, do tipo JPEG ou PNG!'
    );
    return false;
  }

  if (file.size > maxSizeInBytes) {
    showToast('file-size-error', 'error', 'A imagem deve ter no máximo 1MB!');
    return false;
  }

  return true;
};

export default imageValidate;
