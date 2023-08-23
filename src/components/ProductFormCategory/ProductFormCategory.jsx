import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  PostingContainer,
  TitleContainer,
  Title,
  SelectInput,
  CategoriesPickerContainer,
  CategoriesPickerWrapper,
  LinkButtonContainer,
} from './ProductFormCategory.styles';

import ProgressBar from '../ProgressBar';
import LinkButton from '../OrangeButton';
import HelpIcon from '../HelpIcon';

import productCategories from '../../data/productCategories';
import categoryMessageTip from '../../data/adPostingMessagesTips';

import showToast from '../../utils/showToasts';

import { ProductContext } from '../../contexts/ProductProvider';

const ProductFormCategory = ({ currentStep, totalSteps, setActualStep }) => {
  const [categoria, setCategoria] = useState('Selecione uma categoria');
  const [pickCategories, setPickCategories] = useState(false);
  const { posting } = useContext(ProductContext);

  const changeCategory = () => {
    setPickCategories(true);
  };

  const chooseCategory = (category) => {
    setCategoria(`${category.categoria}: ${category.descricao}`);
    posting.category = category.categoria;
    setPickCategories(false);
  };

  const showCategories = () => (
    <CategoriesPickerContainer>
      <CategoriesPickerWrapper>
        {productCategories.map((category) => (
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
    if (categoria === 'Selecione uma categoria') {
      showToast(
        'product-form-category-warn',
        'warn',
        'Por favor, selecione uma categoria'
      );
    } else {
      setActualStep(2);
    }
  };

  return (
    <>
      <PostingContainer>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <TitleContainer>
          <Title>Selecione a categoria do produto</Title>
          <HelpIcon message={categoryMessageTip} />
        </TitleContainer>
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
  totalSteps: PropTypes.number.isRequired,
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormCategory;
