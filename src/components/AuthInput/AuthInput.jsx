import PropTypes from 'prop-types';

import Input from './AuthInput.styles';

const AuthInput = ({ placeholder, type, padding, setValue }) => {
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Input
      placeholder={placeholder}
      type={type}
      onChange={handleInputChange}
      padding={padding}
    />
  );
};

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  padding: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

AuthInput.defaultProps = {
  padding: '',
};

export default AuthInput;
