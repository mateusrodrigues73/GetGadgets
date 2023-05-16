import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { PassContainer, ShowIcon, HiddenIcon } from './AuthPassInput.styles';

import AuthInput from '../AuthInput';

const AuthPassInput = ({ placeholder, setValue }) => {
  const theme = useContext(ThemeContext);
  const { colors } = theme;
  const [hidden, setHidden] = useState(true);
  const [type, setType] = useState('password');
  const [iconColor, setIconColor] = useState(colors.neutralWith);

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

  const handleInputHover = () => {
    setIconColor(colors.secondaryLight);
  };

  const handleInputLeave = () => {
    setIconColor(colors.neutralWith);
  };

  return (
    <PassContainer
      onMouseEnter={handleInputHover}
      onMouseLeave={handleInputLeave}
      onClick={handleInputLeave}
    >
      <AuthInput placeholder={placeholder} type={type} setValue={setValue} />
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
};

export default AuthPassInput;
