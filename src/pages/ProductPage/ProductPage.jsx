import { useContext } from 'react';

import Breadcrumbs from '../../components/Breadcrumbs';

import { ProductContext } from '../../contexts/ProductProvider';

const ProductPage = () => {
  const linksString = '/\\Home';
  // eslint-disable-next-line no-unused-vars
  const { post, seller } = useContext(ProductContext);

  return (
    <Breadcrumbs linksString={linksString} actualPage="Página do produto" />
  );
};

export default ProductPage;
