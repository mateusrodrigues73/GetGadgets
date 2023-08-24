import PropTypes from 'prop-types';

import Button from './OrangeButton.styles';

export const OrangeButton = ({ text, action }) => (
  <Button onClick={action}>{text}</Button>
);

OrangeButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default OrangeButton;
