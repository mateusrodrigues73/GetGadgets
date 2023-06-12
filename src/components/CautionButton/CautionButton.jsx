import PropTypes from 'prop-types';

import { Button, DeleteIcon } from './CautionButton.styles';

const CautionButton = ({ width, height, text, onClick }) => (
  <Button width={width} height={height} onClick={onClick}>
    <DeleteIcon />
    {text}
  </Button>
);

CautionButton.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CautionButton;
