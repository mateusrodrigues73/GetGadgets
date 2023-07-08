import { useContext } from 'react';

import { ProductsContainer } from './Home.styles';

import SectionTitle from '../../components/SectionTitle';
import ProductCard from '../../components/ProductCard/ProductCard';

import { ProductContext } from '../../contexts/ProductProvider';

const Home = () => {
  const { lastProducts } = useContext(ProductContext);

  return (
    <>
      <SectionTitle title="Mais recentes" />
      <ProductsContainer>
        {lastProducts.map((produto) => (
          <ProductCard
            key={produto.id}
            title={produto.titulo}
            image={produto.produto_imagens[0].capa}
            price={produto.preco}
          />
        ))}
      </ProductsContainer>
    </>
  );
};

export default Home;
