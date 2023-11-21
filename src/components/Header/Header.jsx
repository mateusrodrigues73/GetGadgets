import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderWrapper,
  Logo,
  SearchInput,
  SearchLinksContainer,
  SearchContainer,
  SearchIcon,
  LinksContainer,
  LinkIconContainer,
  LinkItem,
  ChatButton,
  UserIcon,
  ShoppingCarIcon,
  LinkWithIcon,
} from './Header.styles';

import ChatWindow from '../ChatWindow';
import Alert from '../Alert';
import Loader from '../Loader';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const Header = () => {
  const [searchInput, setSearchinput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [isAlerting, setIsAlerting] = useState(false);
  const { sessionUser } = useContext(AuthContext);
  const { getProductsByModel } = useContext(ProductContext);
  const navigate = useNavigate();

  const goToLogin = () => {
    setIsAlerting(false);
    navigate('/entrar');
  };

  const cancel = () => {
    setIsAlerting(false);
  };

  const handleChatClick = () => {
    if (!sessionUser) {
      setAlert(
        'Você deve estar logado para visualizar suas conversas. Deseja ir para tela de login?'
      );
      setIsAlerting(true);
    } else {
      setIsChatOpen(!isChatOpen);
    }
  };

  const handleInputChange = (event) => {
    setSearchinput(event.target.value);
  };

  const findProducts = async () => {
    if (!searchInput) {
      return;
    }
    setIsLoading(true);
    setSearchinput('');
    await getProductsByModel(searchInput);
    setIsLoading(false);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Logo src="/images/logo.png" onClick={() => navigate('/')} />
          <SearchLinksContainer>
            <SearchContainer>
              <SearchInput
                placeholder="busque aqui o seu produto"
                onChange={handleInputChange}
                value={searchInput}
              />
              <SearchIcon onClick={findProducts} />
            </SearchContainer>
            <LinksContainer>
              <LinkItem to="/seu-historico">Seu histórico</LinkItem>
              <LinkItem to="/busca-avancada">Busca avançada</LinkItem>
              <LinkItem to="/seus-anuncios">Seus anúncios</LinkItem>
              <ChatButton onClick={handleChatClick}>Suas conversas</ChatButton>
            </LinksContainer>
          </SearchLinksContainer>
          <LinkIconContainer>
            {!sessionUser ? (
              <LinkWithIcon to="/entrar">
                Faça seu login <br /> ou cadastre-se
              </LinkWithIcon>
            ) : (
              <LinkWithIcon to="/perfil">
                Seu perfil de <br /> usuário
              </LinkWithIcon>
            )}
            <UserIcon />
          </LinkIconContainer>
          <LinkIconContainer>
            <LinkWithIcon to="/carrinho-de-compras">
              Seu carrinho <br /> de compras
            </LinkWithIcon>
            <ShoppingCarIcon />
          </LinkIconContainer>
        </HeaderWrapper>
      </HeaderContainer>
      <ChatWindow isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      {isAlerting && (
        <Alert message={alert} onCancel={cancel} onContinue={goToLogin} />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default Header;
