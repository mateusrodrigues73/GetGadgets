import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import PreLoader from '../components/PreLoader';

import showToast from '../utils/ShowToasts';

import { SupabaseContext } from './SupabaseProvider';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { supabase } = useContext(SupabaseContext);
  const [sessionUser, setSessionUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // TODO: finalizar funcionalidade de salvar perfil de usuário no banco

  const storeUser = async (id, userData) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .insert({
          id,
          nome: userData.nome,
          sobrenome: userData.sobrenome,
          email: userData.email,
          senha: userData.senha,
        })
        .select();
      if (error) {
        throw new Error(error.message);
      }
      // eslint-disable-next-line no-console
      console.log('AuthProvider, storeUser, data:');
      // eslint-disable-next-line no-console
      console.log(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const signUp = async (userData) => {
    let msg = '';
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.senha,
        options: {
          emailRedirectTo: 'http://localhost:5173/entrar/validar-email',
        },
      });
      if (error) {
        throw new Error(error.message);
      }
      await storeUser(data.user.id, userData);
      msg = `Sucesso, um e-mail de confirmação foi enviado para: ${userData.email}`;
      showToast('sign-up-success', 'success', msg);
      navigate('/entrar');
    } catch (error) {
      msg = 'Um erro ocorreu durante o cadastro, tente novamente';
      showToast('sign-in-error', 'error', msg);
    }
  };

  const signIn = async (email, password, keepLogin) => {
    let msg = '';
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        if (!keepLogin) {
          localStorage.removeItem(`sb-apovoiknbwujzmlwpvzo-auth-token`);
        }
        setSessionUser(data);
        msg = 'Login bem sucedido';
        showToast('sign-in-success', 'success', msg);
        navigate('/');
      }
    } catch (error) {
      if (error.message === 'Invalid login credentials') {
        msg = 'Credenciais de login inválidas!';
      } else if (error.message === 'Email not confirmed') {
        msg = 'Você deve confirmar seu e-mail antes de continuar!';
      } else {
        msg = 'Um erro ocorreu durante o login, tente novamente';
      }
      showToast('sign-in-error', 'error', msg);
    }
  };

  const getUserSession = async () => {
    setLoading(true);
    let user;
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      user = {
        id: data.user.id,
        email: data.user.email,
      };
    } else {
      user = null;
    }
    setSessionUser(user);
    setLoading(false);
  };

  const signOut = () => supabase.auth.signOut();

  useEffect(() => {
    getUserSession();
  }, []);

  const authContextValue = {
    sessionUser,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <PreLoader /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
