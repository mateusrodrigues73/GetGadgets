import { useState } from 'react';
import PropTypes from 'prop-types';

import { PassContainer, ShowIcon, HiddenIcon } from './AuthPassInput.styles';

import AuthInput from '../AuthInput';

const AuthPassInput = ({ placeholder, setValue }) => {
  const [hidden, setHidden] = useState(true);
  const [type, setType] = useState('password');

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

  return (
    <PassContainer>
      <AuthInput placeholder={placeholder} type={type} setValue={setValue} />
      {hidden ? (
        <HiddenIcon onClick={setInput} />
      ) : (
        <ShowIcon onClick={setInput} />
      )}
    </PassContainer>
  );
};

AuthPassInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default AuthPassInput;
