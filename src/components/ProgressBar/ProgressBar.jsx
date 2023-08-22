import PropTypes from 'prop-types';

import { StepsContainer, ActualStep, Step } from './ProgressBar.styles';

export const ProgressBar = ({ currentStep, totalSteps }) => (
  <StepsContainer>
    {Array.from({ length: totalSteps }).map((_, index) =>
      index + 1 === currentStep ? <ActualStep /> : <Step />
    )}
  </StepsContainer>
);

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
