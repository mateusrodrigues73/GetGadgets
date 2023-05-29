import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';

const UpdatePassword = () => {
  const { recoveryPass } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recoveryPass) {
      navigate('/');
    }
  }, []);

  return <div>recovery</div>;
};

export default UpdatePassword;
