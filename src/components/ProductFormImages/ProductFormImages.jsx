import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  PostingContainer,
  TitleContainer,
  Title,
  ImagesContainer,
  ImagesWrapper,
  Image,
  DeleteIcon,
  LinkButtonContainer,
} from './ProductFormImages.styles';

import ProgressBar from '../ProgressBar';
import HelpIcon from '../HelpIcon';
import GradientButton from '../GradientButton';
import OrangeButton from '../OrangeButton';

import { imagesMessageTip } from '../../data/adPostingMessagesTips';

import showToast from '../../utils/showToasts';
import imageValidate from '../../utils/imageValidate';

import { ProductContext } from '../../contexts/ProductProvider';

const ProductFormImages = ({ currentStep, totalSteps, setActualStep }) => {
  const [images, setImages] = useState([]);
  const [imageTrigger, setImageTrigger] = useState(false);
  const { posting } = useContext(ProductContext);

  const addImage = () => {
    if (images.length < 5) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (imageValidate(file)) {
          images.push(file);
          setImageTrigger(!imageTrigger);
        }
      });
      fileInput.click();
    } else {
      showToast(
        'product-form-specs-limit-warn',
        'warn',
        'Você já atingiu o limite de 5 imagens!'
      );
    }
  };

  const deleteImage = (index) => {
    images.splice(index, 1);
    setImageTrigger(!imageTrigger);
  };

  const renderImages = () => (
    <ImagesContainer>
      {images.map((i, index) => (
        <ImagesWrapper key={index}>
          <Image src={URL.createObjectURL(i)} alt={i.name} />
          <DeleteIcon
            onClick={() => {
              deleteImage(index);
            }}
          />
        </ImagesWrapper>
      ))}
    </ImagesContainer>
  );

  const previous = () => {
    posting.images = images;
    setActualStep(currentStep - 1);
  };

  const next = () => {
    posting.images = images;
    // setActualStep(currentStep + 1);
  };

  useEffect(() => {}, [imageTrigger]);

  useEffect(() => {
    if (posting.images !== undefined) {
      if (posting.images.length !== 0) {
        setImages(posting.images);
      }
    } else {
      posting.images = [];
    }
  }, []);

  return (
    <PostingContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <TitleContainer>
        <Title>Selecione outras imagens para o anúncio</Title>
        <HelpIcon message={imagesMessageTip} />
      </TitleContainer>
      {images.length > 0 && renderImages()}
      <GradientButton
        width="100%"
        height="30px"
        text="Adicionar imagem"
        onClick={addImage}
      />
      <LinkButtonContainer>
        <OrangeButton text="Anterior" action={previous} />
        <OrangeButton text="Ir para revisão" action={next} />
      </LinkButtonContainer>
    </PostingContainer>
  );
};

ProductFormImages.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormImages;
