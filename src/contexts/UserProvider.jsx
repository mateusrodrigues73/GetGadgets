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
    } catch (error) {
      setMessage({
        id: 'update-user-error',
        type: 'error',
        msg: 'Um erro ocorreu ao atualizar seu perfil! Tente novamente',
      });
    }
  };

  const uploadPicture = async (image) => {
    try {
      saveLocalStorage();
      const { data, error } = await supabase.storage
        .from('avatar')
        .upload(`${sessionUser.id}/image`, image, {
          upsert: true,
        });
      if (error) {
        throw new Error(error.message);
      }
      deleteLocalStorage();
      const baseUrl = `https://apovoiknbwujzmlwpvzo.supabase.co/storage/v1/object/public/avatar/`;
      const imageUrl = `${baseUrl}${data.path}`;
      await updateUser({ imagem: imageUrl });
      setMessage({
        id: 'upload-picture-success',
        type: 'success',
        msg: `Imagem enviada com sucesso`,
      });
    } catch (error) {
      deleteLocalStorage();
      setMessage({
        id: 'upload-picture-error',
        type: 'error',
        msg: 'Um erro ocorreu ao enviar a imagem! Tente novamente',
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
