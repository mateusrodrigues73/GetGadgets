import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import {
  PassContainer,
  Input,
  ShowIcon,
  HiddenIcon,
} from './AuthPassInput.styles';

const AuthPassInput = ({ placeholder, setValue, passFocus }) => {
  const theme = useContext(ThemeContext);
  const { colors } = theme;
  const [hidden, setHidden] = useState(true);
  const [type, setType] = useState('password');
  const [iconColor, setIconColor] = useState(colors.neutralWith);
  const [isFocused, setIsFocused] = useState(false);

  const setInput = () => {
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }

    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const setColorBLue = () => {
    if (!isFocused) {
      setIconColor(colors.secondaryLight);
    }
  };

  const setColorWith = () => {
    if (!isFocused) {
      setIconColor(colors.neutralWith);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIconColor(colors.neutralWith);
    passFocus(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    passFocus(false);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <PassContainer
      onMouseEnter={setColorBLue}
      onMouseLeave={setColorWith}
      onClick={setColorWith}
    >
      <Input
        placeholder={placeholder}
        type={type}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
      />
      {hidden ? (
        <HiddenIcon onClick={setInput} color={iconColor} />
      ) : (
        <ShowIcon onClick={setInput} color={iconColor} />
      )}
    </PassContainer>
  );
};

AuthPassInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  passFocus: PropTypes.func,
};

AuthPassInput.defaultProps = {
  passFocus: null,
};

export default AuthPassInput;
