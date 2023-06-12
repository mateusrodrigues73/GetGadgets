import PropTypes from 'prop-types';

import { Button, DeleteIcon } from './CautionButton.styles';

const CautionButton = ({ width, height, text, onClick, icon }) => (
  <Button width={width} height={height} onClick={onClick}>
    {icon ? <DeleteIcon /> : null}
    {text}
  </Button>
);

CautionButton.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.bool.isRequired,
};

export default CautionButton;
