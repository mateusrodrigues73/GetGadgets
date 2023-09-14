import PropTypes from 'prop-types';

import { ButtonContainer, Text, Icon } from './AddButton.styles';

const AddButton = ({ width, height, text, radius, fontSize, onClick }) => (
  <ButtonContainer
    width={width}
    height={height}
    radius={radius}
    onClick={onClick}
  >
    <Icon />
    <Text fontSize={fontSize}>{text}</Text>
  </ButtonContainer>
);

AddButton.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  radius: PropTypes.string,
  fontSize: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

AddButton.defaultProps = {
  radius: null,
  fontSize: null,
};

export default AddButton;
