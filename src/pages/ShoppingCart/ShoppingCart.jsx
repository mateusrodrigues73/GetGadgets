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
  RevisionContainer,
  RevisionWrapper,
  RevisionTilleContainer,
  RevisionTitle,
  RevisionItensContainer,
  RevisionCartItenContainer,
  RevisionItenImage,
  RevisionActionsContainer,
  PaymentMethodContainer,
  PaymentMethodTitle,
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
  const [showRevision, setShowRevision] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
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
    finalizeOrder,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const completePurchase = (paymentMethod) => {
    setAlert(`Finalizar compra utilizando ${paymentMethod}?`);
    setIsAlerting(true);
    setAction(3);
  };

  const backToCart = () => {
    setShowPaymentMethods(false);
  };

  const closeRevision = () => {
    setShowRevision(false);
  };

  const gotToPayment = () => {
    setShowRevision(false);
    setShowPaymentMethods(true);
  };

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

  const buyItens = () => {
    setShowRevision(true);
  };

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
        'Mínimo de 1 item por produto!'
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
    setIsAlerting(false);
    setAction(null);
    if (option === 1) {
      const url = '/carrinho-de-compras';
      setDispathUrl(url);
      navigate('/entrar');
    } else if (option === 2) {
      setIsLoading(true);
      await deleteAllCartItens();
      setIsLoading(false);
    } else if (option === 3) {
      setIsLoading(true);
      await finalizeOrder(userCartItens);
      setIsLoading(false);
    }
  };

  const cancel = () => {
    setIsAlerting(false);
    setAction(null);
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

  const renderRevision = () => (
    <RevisionContainer>
      <RevisionWrapper>
        <RevisionTilleContainer>
          <RevisionTitle>Revisão</RevisionTitle>
        </RevisionTilleContainer>
        <RevisionItensContainer>
          {userCartItens.map((iten, index) => (
            <RevisionCartItenContainer key={index}>
              <RevisionItenImage src={iten.imagem} alt={iten.titulo} />
              <ItenTilleContainer>
                <ItenTitle>{iten.titulo}</ItenTitle>
              </ItenTilleContainer>
              <AmountContainer>
                <ItenTitle>{`Quantidade: ${iten.quantidade_usuario}`}</ItenTitle>
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
            </RevisionCartItenContainer>
          ))}
        </RevisionItensContainer>
        <RevisionTilleContainer>
          <RevisionTitle>{`Valor total: R$${cartTotalPrice}`}</RevisionTitle>
        </RevisionTilleContainer>
        <RevisionActionsContainer>
          <CautionButton
            width="200px"
            height="25px"
            text="Cancelar"
            onClick={closeRevision}
            icon={false}
          />
          <GradientButton
            width="200px"
            height="25px"
            text="Ir para o pagamento"
            onClick={gotToPayment}
          />
        </RevisionActionsContainer>
      </RevisionWrapper>
    </RevisionContainer>
  );

  const renderPaymentMethods = () => (
    <CartContainer>
      <ItensContainer>
        <PaymentMethodContainer
          onClick={() => completePurchase('Cartão de Crédito')}
        >
          <PaymentMethodTitle>Cartão de Crédito</PaymentMethodTitle>
        </PaymentMethodContainer>
        <PaymentMethodContainer
          onClick={() => completePurchase('Boleto Bancário')}
        >
          <PaymentMethodTitle>Boleto Bancário</PaymentMethodTitle>
        </PaymentMethodContainer>
        <PaymentMethodContainer onClick={() => completePurchase('Pix')}>
          <PaymentMethodTitle>Pix</PaymentMethodTitle>
        </PaymentMethodContainer>
      </ItensContainer>
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
        <CautionButton
          width="100%"
          height="25px"
          text="Voltar"
          onClick={backToCart}
          icon={false}
        />
      </SummaryContainer>
    </CartContainer>
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
      {isLogged && userCartItens && !showPaymentMethods && (
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
      {showPaymentMethods && renderPaymentMethods()}
      {showRevision && renderRevision()}
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
