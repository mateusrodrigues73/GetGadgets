import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  PostingContainer,
  TitleContainer,
  Title,
  CoverImage,
  LinkButtonContainer,
} from './ProductFormCover.styles';

import ProgressBar from '../../../components/ProgressBar';
import HelpIcon from '../../../components/HelpIcon';
import GradientButton from '../../../components/GradientButton';
import OrangeButton from '../../../components/OrangeButton';

import { coverImageMessageTip } from '../../../data/adPostingMessagesTips';

import showToast from '../../../utils/showToasts';
import imageValidate from '../../../utils/imageValidate';

import { ProductContext } from '../../../contexts/ProductProvider';

const ProductFormCover = ({ currentStep, totalSteps, setActualStep }) => {
  const [coverImage, setCoverImage] = useState(null);
  const { posting } = useContext(ProductContext);

  const addImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (imageValidate(file)) {
        setCoverImage(file);
      }
    });
    fileInput.click();
  };

  const previous = () => {
    posting.cover = coverImage;
    setActualStep(currentStep - 1);
  };

  const next = () => {
    if (!coverImage) {
      showToast(
        'product-form-cover-noun-warn',
        'warn',
        'Por favor selecione uma imagem para a capa do seu anúncio'
      );
    } else {
      posting.cover = coverImage;
      setActualStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (posting.cover) {
      setCoverImage(posting.cover);
    } else {
      posting.cover = null;
    }
  }, []);

  return (
    <PostingContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <TitleContainer>
        <Title>Selecione a imagem de capa do produto</Title>
        <HelpIcon message={coverImageMessageTip} />
      </TitleContainer>
      {coverImage !== null && (
        <CoverImage
          src={URL.createObjectURL(coverImage)}
          alt={coverImage.name}
        />
      )}
      <GradientButton
        width="100%"
        height="30px"
        text={!coverImage ? 'Adicionar imagem' : 'Alterar Imagem'}
        onClick={addImage}
      />
      <LinkButtonContainer>
        <OrangeButton text="Anterior" action={previous} />
        <OrangeButton text="Próximo" action={next} />
      </LinkButtonContainer>
    </PostingContainer>
  );
};

ProductFormCover.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormCover;
