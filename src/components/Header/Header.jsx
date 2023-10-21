import { useContext, useState } from 'react';

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
  UserIcon,
  ShoppingCarIcon,
  LinkWithIcon,
} from './Header.styles';

import Loader from '../Loader';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const Header = () => {
  const [searchInput, setSearchinput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sessionUser } = useContext(AuthContext);
  const { getProductsByModel } = useContext(ProductContext);

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
          <Logo src="/images/logo.png" />
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
              <LinkItem to="/">Seu histórico</LinkItem>
              <LinkItem to="/busca-avancada">Busca avançada</LinkItem>
              <LinkItem to="/seus-anuncios">Seus anúncios</LinkItem>
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
      {isLoading && <Loader />}
    </>
  );
};

export default Header;
