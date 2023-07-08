import { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import PreLoader from '../components/PreLoader';

import { SupabaseContext } from './SupabaseProvider';
import { AuthContext } from './AuthProvider';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [lastProducts, setLastproducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { supabase } = useContext(SupabaseContext);
  const { sessionUser } = useContext(AuthContext);

  const categorias = [
    {
      categoria: 'Hardware',
      descricao: 'Placa de vídeo, memórias, processador...',
    },
    {
      categoria: 'Periféricos',
      descricao: 'Teclado, mouse, headset...',
    },
    {
      categoria: 'Computadores',
      descricao: 'PC, notebook, monitores...',
    },
    {
      categoria: 'Celular & Smartphone',
      descricao: 'Celulares e smartphones',
    },
    {
      categoria: 'TV',
      descricao: 'Smart Tv, acessórios para TV',
    },
    {
      categoria: 'Games',
      descricao: 'Consoles, controle, jogos em midia fisica...',
    },
  ];

  const getLastProducts = async () => {
    setLoading(true);
    try {
      if (sessionUser) {
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*)')
          .neq('id_usuario', sessionUser.id)
          .order('created_at', { ascending: false })
          .limit(10);
        setLastproducts(error ? null : data);
        if (error) {
          throw new Error(error);
        }
      } else {
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*)')
          .order('created_at', { ascending: false })
          .limit(10);
        setLastproducts(error ? null : data);
        if (error) {
          throw new Error(error);
        }
      }
    } catch (error) {
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getLastProducts();
  }, [sessionUser]);

  const productContextValue = { categorias, lastProducts };

  return (
    <ProductContext.Provider value={productContextValue}>
      {loading ? <PreLoader /> : children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
