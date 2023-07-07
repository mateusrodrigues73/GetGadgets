import { useState, useContext } from 'react';

import {
  PostingContainer,
  Title,
  SelectInput,
  CategoriesPickerContainer,
  CategoriesPickerWrapper,
} from './ProductAdPosting.styles';

import Breadcrumbs from '../../components/Breadcrumbs';

import { ProductContext } from '../../contexts/ProductProvider';
// import { AuthContext } from '../../contexts/AuthProvider';

const ProductAdPosting = () => {
  const [categoria, setCategoria] = useState('Selecione uma categoria');
  const [pickCategories, setPickCategories] = useState(false);
  const { categorias } = useContext(ProductContext);
  // const { sessionUser } = useContext(AuthContext);
  const linksString = '/\\Home|/seus-anuncios\\Seus anúncios';

  const changeCategory = () => {
    setPickCategories(true);
  };

  const chooseCategory = (category) => {
    setCategoria(`${category.categoria}: ${category.descricao}`);
    setPickCategories(false);
  };

  const showCategories = () => (
    <CategoriesPickerContainer>
      <CategoriesPickerWrapper>
        {categorias.map((category) => (
          <SelectInput
            key={category.categoria}
            type="text"
            defaultValue={`${category.categoria}: ${category.descricao}`}
            onClick={() => chooseCategory(category)}
          />
        ))}
      </CategoriesPickerWrapper>
    </CategoriesPickerContainer>
  );

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Cadastrar anúncio" />
      <PostingContainer>
        <Title>Selecione a categoria do produto</Title>
        <SelectInput
          type="text"
          readOnly
          value={categoria}
          onClick={changeCategory}
        />
      </PostingContainer>
      {pickCategories && showCategories()}
    </>
  );
};

export default ProductAdPosting;
