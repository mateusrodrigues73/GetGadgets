import { toast, Slide, Bounce } from 'react-toastify';

const showToast = (id, type, message, theme = 'colored') => {
  if (type === 'success') {
    toast.success(message, {
      toastId: id,
      transition: Slide,
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
    });
  }

  if (type === 'warn') {
    toast.warn(message, {
      toastId: id,
      transition: Bounce,
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
    });
  }

  if (type === 'error') {
    toast.error(message, {
      toastId: id,
      transition: Bounce,
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
    });
  }
};

export default showToast;
