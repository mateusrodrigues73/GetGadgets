import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  IconContainer,
  Icon,
  MessageContainer,
  MessageWrapper,
  Message,
} from './HelpIcon.styles';

import OrangeButton from '../OrangeButton';

const HelpIcon = ({ message }) => {
  const [showMessage, setShowMessage] = useState(false);

  const show = () => {
    setShowMessage(true);
  };

  const hide = () => {
    setShowMessage(false);
  };

  return (
    <IconContainer>
      <Icon onClick={show} />
      {showMessage && (
        <MessageContainer>
          <MessageWrapper>
            <Message>{message}</Message>
            <OrangeButton text="fechar" action={hide} />
          </MessageWrapper>
        </MessageContainer>
      )}
    </IconContainer>
  );
};

HelpIcon.propTypes = {
  message: PropTypes.string.isRequired,
};

export default HelpIcon;
