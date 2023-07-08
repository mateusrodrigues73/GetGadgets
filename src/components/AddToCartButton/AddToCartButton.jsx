import PropTypes from 'prop-types';

import { Button, CartIcon } from './AddToCartButton.styles';

const AddToCartButton = ({ width, height, text, onClick }) => (
  <Button width={width} height={height} onClick={onClick}>
    <CartIcon /> {text}
  </Button>
);

AddToCartButton.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddToCartButton;
