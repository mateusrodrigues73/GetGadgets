import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PageContainer,
  CartContainer,
  ItensContainer,
  CartItenContainer,
  ItenImageContainer,
  ItenImage,
  ItenTilleContainer,
  ItenTitle,
  AmountContainer,
  MinusIcon,
  PlusIcon,
  CartItenPriceContainer,
  SummaryContainer,
  SummaryTitle,
  SummaryDataContainer,
  SummaryDataWrapper,
  SummaryPriceContainer,
  SummaryPrice,
} from './ShoppingCart.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import GradientButton from '../../components/GradientButton';
import CautionButton from '../../components/CautionButton';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';

import showToast from '../../utils/showToasts';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const ShoppingCart = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [action, setAction] = useState(null);
  const [alert, setAlert] = useState('');
  const linksString = '/\\Home';
  const { sessionUser, setDispathUrl } = useContext(AuthContext);
  const {
    userCartItens,
    cartTotalPrice,
    cartTotalItens,
    postToast,
    setPostToast,
    updateCartIten,
    deleteCartIten,
    deleteAllCartItens,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const deleteCart = () => {
    setAlert(
      'Tem certeza que deseja remover todos os produtos do seu carrinho de compras?'
    );
    setIsAlerting(true);
    setAction(2);
  };

  const deleteIten = async (productId) => {
    setIsLoading(true);
    await deleteCartIten(productId);
    setIsLoading(false);
  };

  const buyItens = () => {};

  const decrease = async (productId, userQuantity) => {
    if (userQuantity > 1) {
      const newQuantity = userQuantity - 1;
      const iten = {
        quantidade_usuario: newQuantity,
      };
      setIsLoading(true);
      const result = await updateCartIten(productId, iten);
      setIsLoading(false);
      if (!result) {
        showToast(
          `decrease-user-quantity-cart-iten-verify-error-${productId}`,
          'error',
          'Um erro occoreu ao alterar a quantidade do produto! Tente novamente'
        );
      }
    } else if (userQuantity === 1) {
      showToast(
        `decrease-user-quantity-cart-iten-verify-warn-${productId}`,
        'warn',
        'Mínimo de 1 iten por produto!'
      );
    }
  };

  const increase = async (productId, userQuantity, totalOfItens) => {
    if (userQuantity < totalOfItens) {
      const newQuantity = userQuantity + 1;
      const iten = {
        quantidade_usuario: newQuantity,
      };
      setIsLoading(true);
      const result = await updateCartIten(productId, iten);
      setIsLoading(false);
      if (!result) {
        showToast(
          `increase-user-quantity-cart-iten-verify-error-${productId}`,
          'error',
          'Um erro occoreu ao alterar a quantidade do produto! Tente novamente'
        );
      }
    } else if (userQuantity === totalOfItens) {
      const message =
        totalOfItens === 1 ? 'exemplar disponível!' : 'exemplares disponíveis!';
      showToast(
        `increase-user-quantity-cart-iten-verify-warn-${productId}`,
        'warn',
        `Este produto possui apenas ${totalOfItens} ${message}`
      );
    }
  };

  const alertAction = async (option) => {
    if (option === 1) {
      setIsAlerting(false);
      const url = '/carrinho-de-compras';
      setDispathUrl(url);
      navigate('/entrar');
    } else if (option === 2) {
      setIsLoading(true);
      await deleteAllCartItens();
      setIsLoading(false);
    }
    setAction(null);
  };

  const cancel = () => {
    setIsAlerting(false);
  };

  const renderCartItens = () => (
    <ItensContainer>
      {userCartItens.map((iten, index) => (
        <CartItenContainer key={index}>
          <ItenImageContainer>
            <ItenImage src={iten.imagem} alt={iten.titulo} />
          </ItenImageContainer>
          <ItenTilleContainer>
            <ItenTitle>{iten.titulo}</ItenTitle>
          </ItenTilleContainer>
          <AmountContainer>
            <MinusIcon
              onClick={() => decrease(iten.id_produto, iten.quantidade_usuario)}
            />
            <ItenTitle>{`Quantidade: ${iten.quantidade_usuario}`}</ItenTitle>
            <PlusIcon
              onClick={() =>
                increase(
                  iten.id_produto,
                  iten.quantidade_usuario,
                  iten.quantidade_total
                )
              }
            />
          </AmountContainer>
          {iten.quantidade_usuario === 1 ? (
            <CartItenPriceContainer>
              <ItenTitle>{`Preço: 1 x R$${iten.preco_unitario.toFixed(
                2
              )}`}</ItenTitle>
            </CartItenPriceContainer>
          ) : (
            <CartItenPriceContainer>
              <ItenTitle>{`Preço: ${
                iten.quantidade_usuario
              } x R$${iten.preco_unitario.toFixed(2)}`}</ItenTitle>
              <ItenTitle>{`Total: R${(
                iten.quantidade_usuario * iten.preco_unitario
              ).toFixed(2)}`}</ItenTitle>
            </CartItenPriceContainer>
          )}
          <CautionButton
            width="120px"
            height="25px"
            text="Remover"
            onClick={() => deleteIten(iten.id_produto)}
            icon
          />
        </CartItenContainer>
      ))}
    </ItensContainer>
  );

  useEffect(() => {
    if (!sessionUser) {
      setAlert(
        'Você deve estar logado para ver os itens do seu carrinho. Deseja ir para tela de login?'
      );
      setIsAlerting(true);
      setAction(1);
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
      {isLogged && userCartItens && (
        <CartContainer>
          {renderCartItens()}
          <SummaryContainer>
            <SummaryTitle>Resumo</SummaryTitle>
            <SummaryDataContainer>
              <SummaryDataWrapper>
                <ItenTitle>{`Total de produtos: ${cartTotalItens}`}</ItenTitle>
              </SummaryDataWrapper>
              <SummaryDataWrapper>
                <ItenTitle>{`Valor total: R$${cartTotalPrice}`}</ItenTitle>
              </SummaryDataWrapper>
            </SummaryDataContainer>
            <SummaryPriceContainer>
              <SummaryPrice>{`R$${cartTotalPrice}`}</SummaryPrice>
            </SummaryPriceContainer>
            <GradientButton
              width="100%"
              height="25px"
              text="Finalizar compra"
              onClick={buyItens}
            />
            <CautionButton
              width="100%"
              height="25px"
              text="Esvaziar carrinho"
              onClick={deleteCart}
              icon
            />
          </SummaryContainer>
        </CartContainer>
      )}
      {isLoading && <Loader />}
      {isAlerting && (
        <Alert
          message={alert}
          onCancel={cancel}
          onContinue={() => alertAction(action)}
        />
      )}
    </>
  );
};

export default ShoppingCart;
