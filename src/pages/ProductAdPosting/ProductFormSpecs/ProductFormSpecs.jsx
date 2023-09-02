import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  PostingContainer,
  TitleContainer,
  Title,
  SpecsContainer,
  SpecWrapper,
  SpecText,
  DeleteIcon,
  Line,
  AddSpecInputContainer,
  Input,
  LinkButtonContainer,
} from './ProductFormSpecs.styles';

import ProgressBar from '../../../components/ProgressBar';
import HelpIcon from '../../../components/HelpIcon';
import GradientButton from '../../../components/GradientButton';
import OrangeButton from '../../../components/OrangeButton';

import showToast from '../../../utils/showToasts';

import { specsMessageTip } from '../../../data/adPostingMessagesTips';

import { ProductContext } from '../../../contexts/ProductProvider';

const ProductFormSpecs = ({ currentStep, totalSteps, setActualStep }) => {
  const [spec, setSpec] = useState('');
  const [specs, setSpecs] = useState([]);
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [specTrigger, setSpecTrigger] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { posting } = useContext(ProductContext);

  const handleSpecChange = (event) => {
    const { value } = event.target;
    if (value.length > 50) {
      event.preventDefault();
      return;
    }
    setSpec(value);
  };

  const validateSpec = () => {
    const regex = /^(?!.*\s{2})[^\s].{0,48}[^\s]$/;
    if (spec === '') {
      setMessage('Por favor preencha o campo de especificação');
      setMessageId('product-spec-field-warn');
      return false;
    }
    if (!regex.test(spec)) {
      setMessage('Especificação possui um formato inválido!');
      setMessageId('product-form-specs-validate-warn');
      return false;
    }
    return true;
  };

  const addSpec = () => {
    if (isValid) {
      if (specs.length === 10) {
        showToast(
          'product-form-specs-limit-warn',
          'warn',
          'Você já atingiu o limite de 10 especificações!'
        );
      } else {
        specs.push(spec);
        setSpecTrigger(!specTrigger);
      }
    } else {
      showToast(messageId, 'warn', message);
    }
  };

  const deleteSpec = (index) => {
    specs.splice(index, 1);
    setSpecTrigger(!specTrigger);
  };

  const renderSpecs = () => (
    <SpecsContainer>
      {specs.map((s, index) => (
        <SpecWrapper key={index}>
          <SpecText>{s}</SpecText>
          <DeleteIcon
            onClick={() => {
              deleteSpec(index);
            }}
          />
        </SpecWrapper>
      ))}
    </SpecsContainer>
  );

  const previous = () => {
    posting.specs = specs;
    setActualStep(currentStep - 1);
  };

  const next = () => {
    if (specs.length < 3) {
      showToast(
        'product-form-specs-noun-warn',
        'warn',
        'Você deve adicionar no mínimo 3 especificações!'
      );
    } else {
      posting.specs = specs;
      setActualStep(currentStep + 1);
    }
  };

  useEffect(() => {
    setIsValid(validateSpec);
  }, [spec, specs.length]);

  useEffect(() => {}, [specTrigger]);

  useEffect(() => {
    if (posting.specs !== undefined) {
      if (posting.specs.length !== 0) {
        setSpecs(posting.specs);
      }
    } else {
      posting.specs = [];
    }
  }, []);

  return (
    <PostingContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <TitleContainer>
        <Title>Especificações do produto</Title>
        <HelpIcon message={specsMessageTip} />
      </TitleContainer>
      {specs.length !== 0 && renderSpecs()}
      {specs.length !== 0 && <Line />}
      <AddSpecInputContainer>
        <Input
          type="text"
          placeholder="Adicionar especificação"
          value={spec}
          onChange={handleSpecChange}
        />
        <GradientButton
          width="100%"
          height="30px"
          text="Adicionar"
          onClick={addSpec}
        />
      </AddSpecInputContainer>
      <LinkButtonContainer>
        <OrangeButton text="Anterior" action={previous} />
        <OrangeButton text="Próximo" action={next} />
      </LinkButtonContainer>
    </PostingContainer>
  );
};

ProductFormSpecs.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormSpecs;
