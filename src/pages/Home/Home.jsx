import { useContext } from 'react';

import GradientButton from '../../components/GradientButton';

import { AuthContext } from '../../contexts/AuthProvider';

const Home = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <GradientButton
        width="220px"
        height="25px"
        text="Logout"
        onClick={signOut}
      />
    </div>
  );
};

export default Home;
