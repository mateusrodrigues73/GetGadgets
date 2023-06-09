import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { SupabaseContext } from './SupabaseProvider';
import { AuthContext } from './AuthProvider';

import showToast from '../utils/showToasts';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { supabase } = useContext(SupabaseContext);
  const { sessionUser, setSessionUser, saveLocalStorage, deleteLocalStorage } =
    useContext(AuthContext);
  const [message, setMessage] = useState(null);

  const updateUser = async (values) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .update(values)
        .eq('id', sessionUser.id)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      const user = {
        id: data[0].id,
        nome: data[0].nome,
        sobrenome: data[0].sobrenome,
        email: data[0].email,
        estatus: data[0].estatus,
        imagem: data[0].imagem,
        administrador: data[0].administrador,
        mediaAvaliacoes: data[0].media_avaliacoes,
        totalAvaliacoes: data[0].total_avaliacoes,
        ativo: data[0].ativo,
      };
      if (user.nome !== sessionUser.nome) {
        setMessage({
          id: 'update-user-success',
          type: 'success',
          msg: `Nome alterado com sucesso`,
        });
      } else if (user.sobrenome !== sessionUser.sobrenome) {
        setMessage({
          id: 'update-user-success',
          type: 'success',
          msg: `Sobrenome alterado com sucesso`,
        });
      }
      setSessionUser(user);
      return true;
    } catch (error) {
      setMessage({
        id: 'update-user-error',
        type: 'error',
        msg: 'Um erro ocorreu ao atualizar seu perfil! Tente novamente',
      });
      return false;
    }
  };

  const deleteImage = async (folder, imageUrl) => {
    const lastSlashIndex = imageUrl.lastIndexOf('/');
    const fileName = imageUrl.substring(lastSlashIndex + 1);
    await supabase.storage.from('avatar').remove([`${folder}/${fileName}`]);
  };

  const uploadPicture = async (image) => {
    try {
      saveLocalStorage();
      const { data, error } = await supabase.storage
        .from('avatar')
        .upload(`${sessionUser.id}/${image.name}`, image, {
          upsert: true,
        });
      if (error) {
        throw new Error(error.message);
      }
      await deleteImage(sessionUser.id, sessionUser.imagem);
      deleteLocalStorage();
      const baseUrl = `https://apovoiknbwujzmlwpvzo.supabase.co/storage/v1/object/public/avatar/`;
      const imageUrl = `${baseUrl}${data.path}`;
      const update = await updateUser({ imagem: imageUrl });
      if (update) {
        setMessage({
          id: 'upload-picture-success',
          type: 'success',
          msg: `Imagem enviada com sucesso`,
        });
      }
    } catch (error) {
      deleteLocalStorage();
      setMessage({
        id: 'upload-picture-error',
        type: 'error',
        msg: 'Um erro ocorreu ao enviar a imagem! Tente novamente',
      });
    }
  };

  const deletePicture = async () => {
    try {
      saveLocalStorage();
      await deleteImage(sessionUser.id, sessionUser.imagem);
      deleteLocalStorage();
      const update = await updateUser({ imagem: 'no_image' });
      if (update) {
        setMessage({
          id: 'delete-picture-success',
          type: 'success',
          msg: `Imagem excluída com sucesso`,
        });
      }
    } catch (error) {
      deleteLocalStorage();
      setMessage({
        id: 'delete-picture-error',
        type: 'error',
        msg: 'Um erro ocorreu ao excluir a imagem! Tente novamente',
      });
    }
  };

  const softDeleteUser = async () => {
    try {
      const update = await updateUser({ ativo: false });
      if (update) {
        setMessage({
          id: 'delete-user-success',
          type: 'success',
          msg: `Sua conta foi excluída com sucesso`,
        });
      }
    } catch (error) {
      setMessage({
        id: 'delete-user-error',
        type: 'error',
        msg: 'Um erro ocorreu ao excluir sua conta!',
      });
    }
  };

  useEffect(() => {
    if (message !== null) {
      showToast(message.id, message.type, message.msg);
      setMessage(null);
    }
  }, [message]);

  const userContextValue = {
    updateUser,
    uploadPicture,
    deletePicture,
    softDeleteUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
