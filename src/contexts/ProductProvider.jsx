import { createContext } from 'react';
import PropTypes from 'prop-types';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
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

  const productContextValue = { categorias };

  return (
    <ProductContext.Provider value={{ productContextValue }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
