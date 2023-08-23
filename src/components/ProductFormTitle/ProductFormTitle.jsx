import PropTypes from 'prop-types';

import {
  PostingContainer,
  TitleContainer,
  Title,
} from './ProductFormTitle.styles';

import ProgressBar from '../ProgressBar';
import HelpIcon from '../HelpIcon';

// TODO: fixar eslint-disable-next-line
// eslint-disable-next-line no-unused-vars
const ProductFormTitle = ({ currentStep, totalSteps, setActualStep }) => (
  <PostingContainer>
    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    <TitleContainer>
      <Title>Selecione o título do anúncio</Title>
      <HelpIcon message="123" />
    </TitleContainer>
  </PostingContainer>
);

ProductFormTitle.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormTitle;
