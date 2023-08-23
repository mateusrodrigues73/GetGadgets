import PropTypes from 'prop-types';

import Button from './OrangeButton.styles';

export const LinkButton = ({ text, action }) => (
  <Button onClick={action}>{text}</Button>
);

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default LinkButton;
