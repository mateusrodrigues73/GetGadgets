import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  PostingContainer,
  TitleContainer,
  Title,
  Input,
  LinkButtonContainer,
} from './ProductFormTitle.styles';

import ProgressBar from '../ProgressBar';
import HelpIcon from '../HelpIcon';
import OrangeButton from '../OrangeButton';

import { titleMessageTip } from '../../data/adPostingMessagesTips';

import showToast from '../../utils/showToasts';

import { ProductContext } from '../../contexts/ProductProvider';

const ProductFormTitle = ({ currentStep, totalSteps, setActualStep }) => {
  const [isValid, setIsvalid] = useState(false);
  const [title, setTitle] = useState('');
  const { posting } = useContext(ProductContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const previous = () => {
    posting.title = title;
    setActualStep(currentStep - 1);
  };

  const next = () => {
    if (isValid) {
      posting.title = title;
      setActualStep(currentStep + 1);
    } else {
      showToast('product-form-title-warn', 'warn', 'Título inválido!');
    }
  };

  useEffect(() => {
    const regex = /^(?!.* {2})(?=.*\S)[\s\S]{10,80}$/;
    if (regex.test(title)) {
      setIsvalid(true);
    } else {
      setIsvalid(false);
    }
  }, [title]);

  useEffect(() => {
    if (posting.title) {
      setTitle(posting.title);
    }
  }, []);

  return (
    <PostingContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <TitleContainer>
        <Title>Selecione o título do anúncio</Title>
        <HelpIcon message={titleMessageTip} />
      </TitleContainer>
      <Input
        type="text"
        placeholder="Título"
        value={title}
        onChange={handleTitleChange}
      />
      <LinkButtonContainer>
        <OrangeButton action={previous} text="Anterior" />
        <OrangeButton action={next} text="Próximo" />
      </LinkButtonContainer>
    </PostingContainer>
  );
};

ProductFormTitle.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormTitle;
