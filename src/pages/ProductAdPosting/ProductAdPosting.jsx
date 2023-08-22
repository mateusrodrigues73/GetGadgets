// import { useState, useContext } from 'react';

import ProductFormCategory from '../../components/ProductFormCategory';

import Breadcrumbs from '../../components/Breadcrumbs';

// import { ProductContext } from '../../contexts/ProductProvider';
// import { AuthContext } from '../../contexts/AuthProvider';

const ProductAdPosting = () => {
  // const { sessionUser } = useContext(AuthContext);
  const linksString = '/\\Home|/seus-anuncios\\Seus anúncios';

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Cadastrar anúncio" />
      <ProductFormCategory currentStep={1} />
    </>
  );
};

export default ProductAdPosting;
