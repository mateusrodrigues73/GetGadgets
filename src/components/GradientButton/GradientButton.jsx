import PropTypes from 'prop-types';

import Button from './GradientButton.styles';

const GradientButton = ({ width, height, text, onClick }) => (
  <Button width={width} height={height} onClick={onClick}>
    {text}
  </Button>
);

GradientButton.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GradientButton;
