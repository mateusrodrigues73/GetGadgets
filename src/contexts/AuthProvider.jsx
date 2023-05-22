import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import showToast from '../utils/ShowToasts';

import { SupabaseContext } from './SupabaseProvider';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { supabase } = useContext(SupabaseContext);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    let msg = '';
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        setSession(data);
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

  const signUp = async (val) => {
    let msg = '';
    try {
      const { error } = await supabase.auth.signUp({
        email: val.email,
        password: val.senha,
        options: {
          emailRedirectTo: 'http://localhost:5173/entrar/validar-email',
        },
      });
      if (error) {
        throw new Error(error.message);
      } else {
        msg = `Sucesso, um e-mail de confirmação foi enviado para: ${val.email}`;
        showToast('sign-up-success', 'success', msg);
        navigate('/entrar');
      }
    } catch (error) {
      msg = 'Um erro ocorreu durante o cadastro, tente novamente';
      showToast('sign-in-error', 'error', msg);
    }
  };

  const authContextValue = {
    session,
    signIn,
    signUp,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
