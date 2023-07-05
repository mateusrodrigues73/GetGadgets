import { createContext } from 'react';
import PropTypes from 'prop-types';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const productContextValue = {};

  return (
    <ProductContext.Provider value={{ productContextValue }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
