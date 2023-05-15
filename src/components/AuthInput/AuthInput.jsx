import PropTypes from 'prop-types';

import Input from './AuthInput.styles';

const AuthInput = ({ placeholder, setValue }) => {
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return <Input placeholder={placeholder} onChange={handleInputChange} />;
};

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default AuthInput;
