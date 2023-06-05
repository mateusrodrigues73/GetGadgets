import { createContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropTypes from 'prop-types';

export const SupabaseContext = createContext({});

export const SupabaseProvider = ({ children }) => {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
  );

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

SupabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
