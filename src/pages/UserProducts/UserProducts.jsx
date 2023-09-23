import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PageContainer,
  PostingsContainer,
  PostingContainer,
  PostingImage,
  TilleContainer,
  Title,
} from './Userproducts.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import AddButton from '../../components/AddButton';
import GradientButton from '../../components/GradientButton';
import PagesNav from '../../components/PagesNav';
import Alert from '../../components/Alert';

import showToast from '../../utils/showToasts';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const UserProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLogged, setIsLogged] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [alert, setAlert] = useState('');
  const linksString = '/\\Home';
  const { sessionUser } = useContext(AuthContext);
  const { userPostings, postToast, setPostToast } = useContext(ProductContext);
  const adsPerPage = 7;
  const totalPages = userPostings
    ? Math.ceil(userPostings.length / adsPerPage)
    : null;
  const navigate = useNavigate();

  const goToLogin = () => {
    setIsAlerting(false);
    navigate('/entrar');
  };

  const cancel = () => {
    setIsAlerting(false);
  };

  const AddPosting = () => {
    navigate('/anunciar-produto');
  };

  const editPosting = (postingId) => {
    navigate(`/editar-anuncio/${postingId}`);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPostings = () => {
    const startIndex = (currentPage - 1) * adsPerPage;
    const endIndex = startIndex + adsPerPage;
    const adsToRender = userPostings.slice(startIndex, endIndex);

    return adsToRender.map((posting) => (
      <PostingContainer key={posting.id}>
        <PostingImage
          src={posting.produto_imagens[0].capa}
          alt={posting.titulo}
        />
        <TilleContainer>
          <Title>{posting.titulo}</Title>
        </TilleContainer>
        <GradientButton
          width="255px"
          height="25px"
          text="Editar anúncio"
          onClick={() => editPosting(posting.id)}
        />
      </PostingContainer>
    ));
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
      <Breadcrumbs linksString={linksString} actualPage="Seus anúncios" />
      {!isLogged && (
        <PageContainer>
          <SectionTitle title="Você deve estar logado para ver seus anúncios" />
        </PageContainer>
      )}
      {isLogged && userPostings && (
        <>
          <PostingsContainer>
            <AddButton
              width="285px"
              height="400px"
              text="Adicionar anúncio"
              onClick={AddPosting}
            />
            {renderPostings()}
          </PostingsContainer>
          {userPostings.length > 7 && (
            <PagesNav
              currentPage={currentPage}
              totalPages={totalPages}
              goPrevious={previousPage}
              goNext={nextPage}
            />
          )}
        </>
      )}
      {isLogged && !userPostings && (
        <PageContainer>
          <SectionTitle title="Você não possui nenhum anúncio cadastrado" />
          <AddButton
            width="285px"
            height="383px"
            text="Adicionar anúncio"
            onClick={AddPosting}
          />
        </PageContainer>
      )}
      {isAlerting && (
        <Alert message={alert} onCancel={cancel} onContinue={goToLogin} />
      )}
    </>
  );
};

export default UserProducts;
