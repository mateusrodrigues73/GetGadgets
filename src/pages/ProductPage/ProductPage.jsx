import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ProductContainer,
  ProductWrapper,
  ImagesContainer,
  ImagesWrapper,
  Images,
  CenterImage,
  ProductData,
  Title,
  Price,
  SellerContainer,
  SellerWrapper,
  SellerIconWrapper,
  SellerIcon,
  SellerImage,
  SellerInfoContainer,
  SellerInfo,
  SpecsContainer,
  SpecsWrapper,
  Spec,
} from './ProductPage.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import AddToCartButton from '../../components/AddToCartButton';
import GradientButton from '../../components/GradientButton';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';

import showToast from '../../utils/showToasts';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const ProductPage = () => {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [centerImage, setCenterImage] = useState(null);
  const [sideImages, setSideImages] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [seller, setSeller] = useState(null);
  const [alert, setAlert] = useState('');
  const [isAlerting, setIsAlerting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const linksString = '/\\Home';
  const { id } = useParams();
  const { sessionUser, setDispathUrl } = useContext(AuthContext);
  const { getPost, getSeller, addProductToCart } = useContext(ProductContext);
  const navigate = useNavigate();

  const goToLogin = () => {
    setIsAlerting(false);
    const url = `/produto/${id}`;
    setDispathUrl(url);
    navigate('/entrar');
  };

  const cancel = () => {
    setIsAlerting(false);
  };

  const addToCart = async () => {
    if (!sessionUser) {
      setAlert(
        'Você deve estar logado para adicionar este produto no seu carrinho. Deseja ir para tela de login?'
      );
      setIsAlerting(true);
    } else {
      setIsLoading(true);
      await addProductToCart(id);
      setIsLoading(false);
    }
  };

  const chatWithSeller = () => {};

  const renderSpecs = () => (
    <SpecsWrapper>
      {specs.map((i, index) => (
        <Spec key={index}>{i}</Spec>
      ))}
    </SpecsWrapper>
  );

  const changeCenterImage = (index) => {
    const tempCenterImage = centerImage;
    const newCenterImage = sideImages[index][`imagem${index + 1}`];
    const newSideImages = sideImages;
    const centerImageObj = {
      [`imagem${index + 1}`]: tempCenterImage,
    };
    newSideImages[index] = centerImageObj;
    setSideImages(newSideImages);
    setCenterImage(newCenterImage);
  };

  const renderImages = () => (
    <ImagesWrapper>
      {sideImages.map(
        (i, index) =>
          Object.values(i)[0] !== null && (
            <Images
              key={index}
              src={Object.values(i)[0]}
              alt={`Imagem ${index + 1}`}
              onClick={() => changeCenterImage(index)}
            />
          )
      )}
    </ImagesWrapper>
  );

  const loadData = (post, productSeller) => {
    setTitle(post[0].titulo);
    setPrice(post[0].preco);
    const postImages = post[0].produto_imagens[0];
    const arrayOfImages = [
      { imagem1: postImages.imagem1 },
      { imagem2: postImages.imagem2 },
      { imagem3: postImages.imagem3 },
      { imagem4: postImages.imagem4 },
      { imagem5: postImages.imagem5 },
    ].filter((image) => image !== null);
    const isAllImagesNull = arrayOfImages.every(
      (item, index) => item[`imagem${index + 1}`] === null
    );
    if (isAllImagesNull) {
      setSideImages(null);
    } else {
      setSideImages(arrayOfImages);
    }
    setCenterImage(postImages.capa);
    setSpecs(post[0].produto_informacoes.map((i) => i.informacao));
    setSeller(productSeller[0]);
  };

  const getData = async () => {
    setIsLoading(true);
    const post = await getPost(id);
    if (!post) {
      setIsLoading(false);
      showToast(
        `get-post-error-${id}`,
        'error',
        'Ocorreu um erro ao carregar o produto! Tente mais tarde'
      );
      return;
    }
    const productSeller = await getSeller(post[0].id_usuario);
    if (!productSeller) {
      setIsLoading(false);
      showToast(
        `get-seller-error-${id}`,
        'error',
        'Ocorreu um erro ao carregar o produto! Tente mais tarde'
      );
      return;
    }
    setIsLoading(false);
    loadData(post, productSeller);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Página do produto" />
      <ProductContainer>
        <ProductWrapper>
          <ImagesContainer>
            {sideImages && renderImages()}
            {centerImage && (
              <CenterImage src={centerImage} alt="Capa do anúncio" />
            )}
          </ImagesContainer>
          <ProductData>
            <Title>{title}</Title>
            <Price>{price}</Price>
            <SellerContainer>
              <Title>Vendido por:</Title>
              <SellerWrapper>
                {seller && (
                  <>
                    <SellerIconWrapper>
                      {seller.imagem === 'no_image' ? (
                        <SellerIcon />
                      ) : (
                        <SellerImage src={seller.imagem} alt="Vendedor" />
                      )}
                    </SellerIconWrapper>
                    <SellerInfoContainer>
                      <SellerInfo>{seller.nome}</SellerInfo>
                      <SellerInfo>
                        {seller.total_avaliacoes === 0
                          ? 'Sem avaliações'
                          : `Avaliações: ${seller.media_avaliacoes}`}
                      </SellerInfo>
                      <GradientButton
                        width="160px"
                        height="24px"
                        text="Conversar"
                        onClick={chatWithSeller}
                      />
                    </SellerInfoContainer>
                  </>
                )}
              </SellerWrapper>
            </SellerContainer>
            <AddToCartButton
              width="265px"
              height="30px"
              text="Adicionar ao carrinho"
              onClick={addToCart}
            />
          </ProductData>
          {specs && (
            <SpecsContainer>
              <Title>Informações do produto</Title>
              {renderSpecs()}
            </SpecsContainer>
          )}
        </ProductWrapper>
      </ProductContainer>
      {isLoading && <Loader />}
      {isAlerting && (
        <Alert message={alert} onCancel={cancel} onContinue={goToLogin} />
      )}
    </>
  );
};

export default ProductPage;
