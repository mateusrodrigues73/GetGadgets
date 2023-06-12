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
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const getUser = async (id) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select()
      .eq('id', id);
    if (error) {
      return false;
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
    return user;
  };

  const getUserSession = async () => {
    setLoading(true);
    let user;
    if (localStorage.length > 0) {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        user = await getUser(data.user.id);
      } else {
        user = null;
      }
    } else {
      user = null;
    }
    setSessionUser(user);
    setLoading(false);
  };

  const storeUser = async (id, userData) => {
    const { error } = await supabase.from('usuarios').insert({
      id,
      nome: userData.nome,
      sobrenome: userData.sobrenome,
      email: userData.email,
    });
    if (error) {
      throw new Error(error.message);
    }
  };

  const signUp = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.senha,
        options: {
          emailRedirectTo:
            'https://getgadgets.netlify.app/entrar/validar-email',
        },
      });
      if (error) {
        throw new Error(error.message);
      }
      await storeUser(data.user.id, userData);
      setMessage({
        id: 'sign-up-success',
        type: 'success',
        msg: `Sucesso, um e-mail de confirmação foi enviado para: ${userData.email}`,
      });
      navigate('/entrar');
    } catch (error) {
      setMessage({
        id: 'sign-up-error',
        type: 'error',
        msg: 'Um erro ocorreu durante o cadastro! Tente novamente',
      });
    }
  };

  const signIn = async (email, password, keepLogin) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        if (!keepLogin) {
          localStorage.clear();
        }
        const user = await getUser(data.user.id);
        setSessionUser(user);
        setMessage({
          id: 'sign-in-success',
          type: 'success',
          msg: 'Login bem sucedido',
        });
        navigate('/');
      }
    } catch (error) {
      if (error.message === 'Invalid login credentials') {
        setMessage({
          id: 'sign-in-error',
          type: 'error',
          msg: 'Credenciais de login inválidas!',
        });
      } else if (error.message === 'Email not confirmed') {
        setMessage({
          id: 'sign-in-error',
          type: 'error',
          msg: 'Você deve confirmar seu e-mail antes de continuar!',
        });
      } else {
        setMessage({
          id: 'sign-in-error',
          type: 'error',
          msg: 'Um erro ocorreu durante o login! Tente novamente',
        });
      }
    }
  };

  const sendResetPasswordEmail = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          'http://getgadgets.netlify.app/atualizar-senha/validar-senha',
      });
      if (error) {
        throw new Error(error.message);
      }
      setMessage({
        id: 'send-reset-password-email-success',
        type: 'success',
        msg: 'E-mail de confirmação enviado com sucesso',
      });
      navigate('/entrar');
    } catch (error) {
      setMessage({
        id: 'send-reset-password-email-error',
        type: 'error',
        msg: 'Ocorreu um erro ao enviar o e-mail! Tente novamente',
      });
    }
  };

  const verifyEmail = async (email) => {
    try {
      const { data, error } = await supabase.from('usuarios').select('email');
      if (error) {
        throw new Error(error.message);
      }
      const emailExist = data.some((e) => e.email === email);
      if (emailExist) {
        await sendResetPasswordEmail(email);
      } else {
        setMessage({
          id: 'verify-email-error',
          type: 'error',
          msg: 'E-mail não encontrado na base de dados!',
        });
      }
    } catch (error) {
      setMessage({
        id: 'send-reset-password-email-error',
        type: 'error',
        msg: 'Ocorreu um erro ao verificar seu e-mail! Tente novamente',
      });
    }
  };

  const updatePassword = async (pass) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: pass,
      });
      if (error) {
        throw new Error(error.message);
      }
      setMessage({
        id: 'update-password-success',
        type: 'success',
        msg: 'Senha atualizada com sucesso',
      });
      localStorage.clear();
      setSessionUser(null);
      navigate('/entrar');
    } catch (error) {
      setMessage({
        id: 'update-password-error',
        type: 'error',
        msg: 'Ocorreu um erro ao alterar a senha! Tente novamente',
      });
    }
  };

  const signOut = () => {
    supabase.auth.signOut();
    setSessionUser(null);
    navigate('/entrar');
  };

  useEffect(() => {
    getUserSession();
  }, []);

  useEffect(() => {
    if (message !== null) {
      showToast(message.id, message.type, message.msg);
      setMessage(null);
    }
  }, [message]);

  const authContextValue = {
    sessionUser,
    setSessionUser,
    signIn,
    signUp,
    signOut,
    verifyEmail,
    updatePassword,
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
