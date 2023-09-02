import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  PostingContainer,
  TitleContainer,
  Title,
  Input,
  LinkButtonContainer,
} from './ProductFormData.styles';

import ProgressBar from '../../../components/ProgressBar';
import OrangeButton from '../../../components/OrangeButton';

import showToast from '../../../utils/showToasts';

import validate from './productFormDataValidateInputs';

import { ProductContext } from '../../../contexts/ProductProvider';

export const ProductFormData = ({ currentStep, totalSteps, setActualStep }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { posting } = useContext(ProductContext);

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    if (numericValue.length > 7) {
      event.preventDefault();
    } else if (numericValue !== '') {
      const formattedValue = (parseFloat(numericValue) / 100).toLocaleString(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
        }
      );
      setPrice(formattedValue === 'R$ 0,00' ? '' : formattedValue);
    }
  };

  const handleQuantityChange = (event) => {
    const inputValue = event.target.value;
    if (!/^[0-9]*$/.test(inputValue) && inputValue !== String.fromCharCode(8)) {
      event.preventDefault();
      return;
    }
    if (inputValue.length > 4) {
      event.preventDefault();
      return;
    }
    setQuantity(inputValue);
  };

  const previous = () => {
    posting.data.brand = brand;
    posting.data.model = model;
    posting.data.price = price;
    posting.data.quantity = quantity;
    setActualStep(currentStep - 1);
  };

  const next = () => {
    if (isValid) {
      posting.data.brand = brand;
      posting.data.model = model;
      posting.data.price = price;
      posting.data.quantity = quantity;
      setActualStep(currentStep + 1);
    } else {
      showToast(messageId, 'warn', message);
    }
  };

  useEffect(() => {
    if (posting.data !== undefined) {
      if (posting.data.brand !== undefined) {
        setBrand(posting.data.brand);
      }
      if (posting.data.model !== undefined) {
        setModel(posting.data.model);
      }
      if (posting.data.price !== undefined) {
        setPrice(posting.data.price);
      }
      if (posting.data.quantity !== undefined) {
        setQuantity(posting.data.quantity);
      }
    } else {
      posting.data = {
        brand: '',
        model: '',
        price: '',
        quantity: '',
      };
    }
  }, []);

  useEffect(() => {
    setIsValid(
      validate(brand, model, price, quantity, setMessage, setMessageId)
    );
  }, [brand, model, price, quantity]);

  return (
    <PostingContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <TitleContainer>
        <Title> Descreva os dados do produto</Title>
      </TitleContainer>
      <Input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={handleBrandChange}
      />
      <Input
        type="text"
        placeholder="Modelo"
        value={model}
        onChange={handleModelChange}
      />
      <Input
        type="text"
        placeholder="Preço"
        value={price}
        onChange={handlePriceChange}
      />
      <Input
        type="text"
        placeholder="Quantidade"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <LinkButtonContainer>
        <OrangeButton text="Anterior" action={previous} />
        <OrangeButton text="Próximo" action={next} />
      </LinkButtonContainer>
    </PostingContainer>
  );
};

ProductFormData.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormData;
