import PropTypes from 'prop-types';

import Input from './AuthInput.styles';

const AuthInput = ({ placeholder }) => <Input placeholder={placeholder} />;

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default AuthInput;
