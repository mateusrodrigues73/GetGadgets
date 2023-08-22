import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  PostingContainer,
  Title,
  SelectInput,
  CategoriesPickerContainer,
  CategoriesPickerWrapper,
  LinkButtonContainer,
} from './ProductFormCategory.styles';

import ProgressBar from '../ProgressBar';
import LinkButton from '../LinkButton';

import { ProductContext } from '../../contexts/ProductProvider';

const ProductFormCategory = ({ currentStep }) => {
  const [categoria, setCategoria] = useState('Selecione uma categoria');
  const [pickCategories, setPickCategories] = useState(false);
  const { categorias } = useContext(ProductContext);

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

  const next = () => {
    // TODO: implementar função para avanlçar para o proximo componente
  };

  return (
    <>
      <PostingContainer>
        <ProgressBar currentStep={currentStep} />
        <Title>Selecione a categoria do produto</Title>
        <SelectInput
          type="text"
          readOnly
          value={categoria}
          onClick={changeCategory}
        />
        <LinkButtonContainer>
          <LinkButton text="Próximo" action={next} />
        </LinkButtonContainer>
      </PostingContainer>
      {pickCategories && showCategories()}
    </>
  );
};

ProductFormCategory.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProductFormCategory;
