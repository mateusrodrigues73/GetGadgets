import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../UserProducts/Userproducts.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';

import showToast from '../../utils/showToasts';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const ShoppingCart = () => {
  const [isLogged, setIsLogged] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [alert, setAlert] = useState('');
  const linksString = '/\\Home';
  const { sessionUser, setDispathUrl } = useContext(AuthContext);
  const { userCartItens, postToast, setPostToast } = useContext(ProductContext);
  const navigate = useNavigate();

  const goToLogin = () => {
    setIsAlerting(false);
    const url = '/carrinho-de-compras';
    setDispathUrl(url);
    navigate('/entrar');
  };

  const cancel = () => {
    setIsAlerting(false);
  };

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

  useEffect(() => {
    if (postToast) {
      showToast(postToast.id, postToast.type, postToast.message);
      setPostToast(null);
    }
  }, []);

  return (
    <>
      <Breadcrumbs
        linksString={linksString}
        actualPage="Seu carrinho de compras"
      />
      {!isLogged && (
        <PageContainer>
          <SectionTitle title="Você deve estar logado para ver os itens do seu carrinho" />
        </PageContainer>
      )}
      {isLogged && !userCartItens && (
        <PageContainer>
          <SectionTitle title="Você não possui nenhum produto no seu carrinho" />
        </PageContainer>
      )}
      {isLoading && <Loader />}
      {isAlerting && (
        <Alert message={alert} onCancel={cancel} onContinue={goToLogin} />
      )}
    </>
  );
};

export default ShoppingCart;
