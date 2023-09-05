import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from './Userproducts.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
// import GradientButton from '../../components/GradientButton';
import Alert from '../../components/Alert';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const UserProducts = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [alert, setAlert] = useState('');
  const linksString = '/\\Home';
  const { sessionUser } = useContext(AuthContext);
  const { userPostings } = useContext(ProductContext);
  const navigate = useNavigate();

  const goToLogin = () => {
    setIsAlerting(false);
    navigate('/entrar');
  };

  const cancel = () => {
    setIsAlerting(false);
  };

  // const criarAnuncio = () => {
  //   navigate('/anunciar-produto');
  // };

  useEffect(() => {
    if (!sessionUser) {
      setAlert(
        'Você deve estar logado para ver seus anúncios. Deseja ir para tela de login?'
      );
      setIsAlerting(true);
    } else {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Seus anúncios" />
      {!isLogged && (
        <Container>
          <SectionTitle title="Você deve estar logado para ver seus anúncios" />
        </Container>
      )}
      {isLogged && userPostings && (
        <SectionTitle title="Você possui anúncios cadastrados" />
      )}
      {isLogged && !userPostings && (
        <SectionTitle title="Você não possui nenhum anúncio cadastrado" />
      )}
      {isAlerting && (
        <Alert message={alert} onCancel={cancel} onContinue={goToLogin} />
      )}
    </>
  );
};

export default UserProducts;
