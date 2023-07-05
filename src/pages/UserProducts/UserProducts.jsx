import { useNavigate } from 'react-router-dom';

import Container from './Userproducts.styles';

import GradientButton from '../../components/GradientButton';

const UserProducts = () => {
  const navigate = useNavigate();

  const criarAnuncio = () => {
    navigate('/anunciar-produto');
  };

  return (
    <Container>
      <GradientButton
        width="220px"
        height="25px"
        text="Cadastrar anúncio"
        onClick={criarAnuncio}
      />
    </Container>
  );
};

export default UserProducts;
