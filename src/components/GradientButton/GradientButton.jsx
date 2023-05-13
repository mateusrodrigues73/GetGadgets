import PropTypes from 'prop-types';

import Button from './GradientButton.styles';

const GradientButton = ({ width, height }) => (
  <Button width={width} heigth={height} />
);

GradientButton.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default GradientButton;
