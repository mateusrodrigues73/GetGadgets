import PropTypes from 'prop-types';

import {
  AlertContainer,
  AlertWrapper,
  Message,
  ButtonsContainer,
} from './Alert.styles';

import AuthTitle from '../AuthTitle';
import GradientButton from '../GradientButton';
import CautionButton from '../CautionButton';

const Alert = ({ message, onCancel, onContinue }) => {
  const cancel = () => {
    onCancel();
  };

  const proceed = () => {
    onContinue();
  };

  return (
    <AlertContainer>
      <AlertWrapper>
        <AuthTitle title="Atenção!" />
        <Message>{message}</Message>
        <ButtonsContainer>
          <GradientButton
            width="150px"
            height="25px"
            text="Cancelar"
            onClick={cancel}
          />
          <CautionButton
            width="150px"
            height="25px"
            text="Continuar"
            onClick={proceed}
            icon
          />
        </ButtonsContainer>
      </AlertWrapper>
    </AlertContainer>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default Alert;
