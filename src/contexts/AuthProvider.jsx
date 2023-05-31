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
  const [message, setMessage] = useState('');
  const [recoveryPass, setRecoveryPass] = useState(false);
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
      email: data[0].nome,
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
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      user = await getUser(data.user.id);
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
          emailRedirectTo: 'http://localhost:5173/entrar/validar-email',
        },
      });
      if (error) {
        throw new Error(error.message);
      }
      await storeUser(data.user.id, userData);
      setMessage(
        `Sucesso, um e-mail de confirmação foi enviado para: ${userData.email}`
      );
      showToast('sign-up-success', 'success', message);
      navigate('/entrar');
    } catch (error) {
      setMessage('Um erro ocorreu durante o cadastro, tente novamente');
      showToast('sign-in-error', 'error', message);
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
        setMessage('Login bem sucedido');
        showToast('sign-in-success', 'success', message);
        navigate('/');
      }
    } catch (error) {
      if (error.message === 'Invalid login credentials') {
        setMessage('Credenciais de login inválidas!');
      } else if (error.message === 'Email not confirmed') {
        setMessage('Você deve confirmar seu e-mail antes de continuar!');
      } else {
        setMessage('Um erro ocorreu durante o login, tente novamente');
      }
      showToast('sign-in-error', 'error', message);
    }
  };

  const sendResetPasswordEmail = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/atualizar-senha',
      });
      if (error) {
        throw new Error(error.message);
      }
      setMessage('E-mail enviado com sucesso');
      showToast('send-reset-password-email-success', 'success', message);
      navigate('/entrar');
    } catch (error) {
      setMessage('Ocorreu um erro ao enviar o e-mail, tente novamente');
      showToast('send-reset-password-email-error', 'error', message);
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
        setMessage('E-mail não encontrado na base de dados');
        showToast('verify-email-error', 'error', message);
      }
    } catch (error) {
      setMessage('Ocorreu um erro ao verificar seu e-mail, tente novamente');
      showToast('send-reset-password-email-error', 'error', message);
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
      setMessage('Senha atualizada com sucesso');
      showToast('update-password-success', 'success', message);
      localStorage.clear();
      setSessionUser(null);
      setRecoveryPass(false);
      navigate('/entrar');
    } catch (error) {
      setMessage('Ocorreu um erro ao alterar a senha, tente novamente');
      showToast('update-password-error', 'error', message);
    }
  };

  const signOut = () => supabase.auth.signOut();

  const confirmRecoveryPassword = async () => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryPass(true);
      }
    });
  };

  useEffect(() => {
    getUserSession();
    confirmRecoveryPassword();
  }, []);

  const authContextValue = {
    sessionUser,
    recoveryPass,
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
