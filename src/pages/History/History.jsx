import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PageContainer,
  HistoricContainer,
  HistoricWrapper,
  HistoricTitle,
  ItenContainer,
  ItenImage,
  ItenDataContainer,
  ItenData,
  UserContainer,
  UserTitle,
  UserWrapper,
  UserIconWrapper,
  UserIcon,
  UserImage,
  UserDataContainer,
  StatusContainer,
  StatusTitle,
  StatusMessage,
  HistoricDataContainer,
  HistoricData,
} from './History.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import GradientButton from '../../components/GradientButton';
import ChatWindow from '../../components/ChatWindow';
import FloatChatWindow from '../../components/FloatChatWindow';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

import showToast from '../../utils/showToasts';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';
import { ChatContext } from '../../contexts/ChatProvider';

export const History = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFloatChatOpen, setIsFloatChatOpen] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [alert, setAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sessionUser, setDispathUrl } = useContext(AuthContext);
  const { historicItems, updateHistoricStatus, postToast, setPostToast } =
    useContext(ProductContext);
  const { messages, setUserChat } = useContext(ChatContext);
  const navigate = useNavigate();
  const linksString = '/\\Home';

  const chatWithSeller = (userChat) => {
    if (messages && messages.some((objeto) => objeto.user.id === userChat.id)) {
      setIsChatOpen(true);
    } else {
      setUserChat(userChat);
      setIsFloatChatOpen(true);
    }
  };

  const changeStatus = async (id, status) => {
    setIsLoading(true);
    await updateHistoricStatus(id, { status });
    setIsLoading(false);
  };

  const goToLogin = () => {
    setIsAlerting(false);
    setDispathUrl('/seu-historico');
    navigate('/entrar');
  };

  const cancel = () => {
    setIsAlerting(false);
  };

  const renderPurchases = (purchases) =>
    purchases.length > 0 && (
      <HistoricWrapper>
        <HistoricTitle>Suas compras</HistoricTitle>
        {purchases.map((iten) => (
          <ItenContainer key={iten.id}>
            <ItenImage src={iten.imagem} alt={iten.titulo} />
            <ItenDataContainer>
              <ItenData>
                {iten.titulo.length > 35
                  ? `${iten.titulo.substring(0, 32)}...`
                  : iten.titulo}
              </ItenData>
              <ItenData>{`Quantidade: ${iten.quantidade}`}</ItenData>
              <ItenData>{`Preço: ${iten.quantidade} x R$ ${
                typeof iten.preco === 'number'
                  ? iten.preco.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : iten.preco
              }`}</ItenData>
              <ItenData>{`Total: R$ ${(
                iten.quantidade * iten.preco
              ).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}</ItenData>
            </ItenDataContainer>
            <UserContainer>
              <UserTitle>Vendedor:</UserTitle>
              <UserWrapper>
                <UserIconWrapper>
                  {iten.seller.imagem === 'no_image' ? (
                    <UserIcon />
                  ) : (
                    <UserImage src={iten.seller.imagem} alt="Vendedor" />
                  )}
                </UserIconWrapper>
                <UserDataContainer>
                  <ItenData>{`${iten.seller.nome} ${iten.seller.sobrenome}`}</ItenData>
                  <GradientButton
                    width="175px"
                    height="20px"
                    text="Conversar"
                    onClick={() =>
                      chatWithSeller({
                        id: iten.id_vendedor,
                        nome: `${iten.seller.nome} ${iten.seller.sobrenome}`,
                        imagem: iten.seller.imagem,
                      })
                    }
                  />
                </UserDataContainer>
              </UserWrapper>
            </UserContainer>
            {iten.status === 1 ? (
              <StatusContainer>
                <StatusTitle>Status: a ser enviado pelo vendedor</StatusTitle>
              </StatusContainer>
            ) : (
              <StatusContainer>
                <StatusTitle>Status: produto a caminho</StatusTitle>
                <StatusMessage>
                  Clique para alterar o status quando o produto chegar
                </StatusMessage>
                <GradientButton
                  width="325px"
                  height="25px"
                  text="Alterar Status"
                  onClick={() => changeStatus(iten.id, 3)}
                />
              </StatusContainer>
            )}
          </ItenContainer>
        ))}
      </HistoricWrapper>
    );

  const renderSales = (sales) =>
    sales.length > 0 && (
      <HistoricWrapper>
        <HistoricTitle>Suas vendas</HistoricTitle>
        {sales.map((iten) => (
          <ItenContainer key={iten.id}>
            <ItenImage src={iten.imagem} alt={iten.titulo} />
            <ItenDataContainer>
              <ItenData>
                {iten.titulo.length > 35
                  ? `${iten.titulo.substring(0, 32)}...`
                  : iten.titulo}
              </ItenData>
              <ItenData>{`Quantidade: ${iten.quantidade}`}</ItenData>
              <ItenData>{`Preço: ${iten.quantidade} x R$ ${
                typeof iten.preco === 'number'
                  ? iten.preco.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : iten.preco
              }`}</ItenData>
              <ItenData>{`Total: R$ ${(
                iten.quantidade * iten.preco
              ).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}</ItenData>
            </ItenDataContainer>
            <UserContainer>
              <UserTitle>Comprador:</UserTitle>
              <UserWrapper>
                <UserIconWrapper>
                  {iten.buyer.imagem === 'no_image' ? (
                    <UserIcon />
                  ) : (
                    <UserImage src={iten.buyer.imagem} alt="Comprador" />
                  )}
                </UserIconWrapper>
                <UserDataContainer>
                  <ItenData>{`${iten.buyer.nome} ${iten.buyer.sobrenome}`}</ItenData>
                  <GradientButton
                    width="175px"
                    height="20px"
                    text="Conversar"
                    onClick={() =>
                      chatWithSeller({
                        id: iten.id_comprador,
                        nome: `${iten.buyer.nome} ${iten.buyer.sobrenome}`,
                        imagem: iten.buyer.imagem,
                      })
                    }
                  />
                </UserDataContainer>
              </UserWrapper>
            </UserContainer>
            {iten.status === 2 ? (
              <StatusContainer>
                <StatusTitle>Status: produto a caminho</StatusTitle>
              </StatusContainer>
            ) : (
              <StatusContainer>
                <StatusTitle>Status: a ser enviado</StatusTitle>
                <StatusMessage>
                  Clique para alterar o status quando você enviar o produto
                </StatusMessage>
                <GradientButton
                  width="325px"
                  height="25px"
                  text="Alterar Status"
                  onClick={() => changeStatus(iten.id, 2)}
                />
              </StatusContainer>
            )}
          </ItenContainer>
        ))}
      </HistoricWrapper>
    );

  const renderSellerImage = (iten) =>
    iten.seller.imagem === 'no_image' ? (
      <UserIcon />
    ) : (
      <UserImage src={iten.seller.imagem} alt="Vendedor" />
    );

  const renderBuyerImage = (iten) =>
    iten.buyer.imagem === 'no_image' ? (
      <UserIcon />
    ) : (
      <UserImage src={iten.buyer.imagem} alt="Comprador" />
    );

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Pegando apenas os dois últimos dígitos do ano
    return `${day}/${month}/${year}`;
  };

  const renderHistoricItens = () => {
    const emAndamento = (historicItems.sales ?? [])
      .concat(historicItems.purchases ?? [])
      .filter((item) => item.status === 1 || item.status === 2)
      .sort((a, b) => new Date(b.data) - new Date(a.data));
    const concluido = (historicItems.sales ?? [])
      .concat(historicItems.purchases ?? [])
      .filter((item) => item.status === 3)
      .sort((a, b) => new Date(b.data) - new Date(a.data));
    const compras = emAndamento.filter(
      (item) => sessionUser.id === item.id_comprador
    );
    const vendas = emAndamento.filter(
      (item) => sessionUser.id === item.id_vendedor
    );

    return (
      <HistoricContainer>
        {emAndamento.length > 0 && (
          <>
            <SectionTitle title="Em andamento" />
            {renderPurchases(compras)}
            {renderSales(vendas)}
          </>
        )}
        {concluido.length > 0 && (
          <>
            <SectionTitle title="Seu histórico" />
            <HistoricWrapper>
              {concluido.map((iten) => (
                <ItenContainer key={iten.id}>
                  <ItenImage src={iten.imagem} alt={iten.titulo} />
                  <ItenDataContainer>
                    <ItenData>
                      {iten.titulo.length > 35
                        ? `${iten.titulo.substring(0, 32)}...`
                        : iten.titulo}
                    </ItenData>
                    <ItenData>{`Quantidade: ${iten.quantidade}`}</ItenData>
                    <ItenData>{`Preço: ${iten.quantidade} x R$ ${
                      typeof iten.preco === 'number'
                        ? iten.preco.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : iten.preco
                    }`}</ItenData>
                    <ItenData>{`Total: R$ ${(
                      iten.quantidade * iten.preco
                    ).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}</ItenData>
                  </ItenDataContainer>
                  <HistoricDataContainer>
                    <HistoricData>
                      {iten.id_comprador === sessionUser.id
                        ? 'Você: comprou'
                        : 'Você: vendeu'}
                    </HistoricData>
                    <HistoricData>{`Data: ${formatDate(
                      new Date(iten.data)
                    )}`}</HistoricData>
                  </HistoricDataContainer>
                  <UserContainer>
                    <UserTitle>
                      {iten.id_comprador === sessionUser.id
                        ? 'Vendido por:'
                        : 'Comprado por:'}
                    </UserTitle>
                    <UserWrapper>
                      <UserIconWrapper>
                        {iten.id_comprador === sessionUser.id
                          ? renderSellerImage(iten)
                          : renderBuyerImage(iten)}
                      </UserIconWrapper>
                      <UserDataContainer>
                        <ItenData>
                          {iten.id_comprador === sessionUser.id
                            ? `${iten.seller.nome} ${iten.seller.sobrenome}`
                            : `${iten.buyer.nome} ${iten.buyer.sobrenome}`}
                        </ItenData>
                      </UserDataContainer>
                    </UserWrapper>
                  </UserContainer>
                </ItenContainer>
              ))}
            </HistoricWrapper>
          </>
        )}
      </HistoricContainer>
    );
  };

  useEffect(() => {
    if (!sessionUser) {
      setAlert(
        'Você deve estar logado para ver seu histórico. Deseja ir para tela de login?'
      );
      setIsAlerting(true);
    }
  }, []);

  useEffect(() => {
    if (postToast) {
      showToast(postToast.id, postToast.type, postToast.message);
      setPostToast(null);
    }
  }, []);

  useEffect(() => {
    if (postToast) {
      showToast(postToast.id, postToast.type, postToast.message);
      setPostToast(null);
    }
  }, [historicItems]);

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Seus anúncios" />
      {!sessionUser && (
        <PageContainer>
          <SectionTitle title="Você deve estar logado para ver seu histórico" />
        </PageContainer>
      )}
      {sessionUser && !historicItems ? (
        <PageContainer>
          <SectionTitle title="Você não possui nenhum item no seu histórico" />
        </PageContainer>
      ) : (
        historicItems && <PageContainer>{renderHistoricItens()}</PageContainer>
      )}
      <ChatWindow isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <FloatChatWindow
        isOpen={isFloatChatOpen}
        setIsOpen={setIsFloatChatOpen}
      />
      {isLoading && <Loader />}
      {isAlerting && (
        <Alert message={alert} onCancel={cancel} onContinue={goToLogin} />
      )}
    </>
  );
};

export default History;
