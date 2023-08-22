import PropTypes from 'prop-types';

import { StepsContainer, ActualStep, Step } from './ProgressBar.styles';

export const ProgressBar = ({ currentStep }) => (
  <StepsContainer>
    {Array.from({ length: 6 }).map((_, index) =>
      index + 1 === currentStep ? <ActualStep /> : <Step />
    )}
  </StepsContainer>
);

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
