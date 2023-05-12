import { useState } from 'react';

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

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchInput, setSearchinput] = useState('');

  const handleInputChange = (event) => {
    setSearchinput(event.target.value);
  };

  const findProducts = () => {
    // TODO: implementar função para busca de produtos
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo src="/images/logo.png" />
        <SearchLinksContainer>
          <SearchContainer>
            <SearchInput
              placeholder="busque aqui o seu produto"
              onChange={handleInputChange}
            />
            <SearchIcon onClick={findProducts} />
          </SearchContainer>
          <LinksContainer>
            <LinkItem to="/">Fóruns</LinkItem>
            <LinkItem to="/">Seu histórico</LinkItem>
            <LinkItem to="/">Busca avançada</LinkItem>
            <LinkItem to="/">Seus anúncios</LinkItem>
          </LinksContainer>
        </SearchLinksContainer>
        <LinkIconContainer>
          <LinkWithIcon to="/">
            Faça seu login <br /> ou cadastre-se
          </LinkWithIcon>
          <UserIcon />
        </LinkIconContainer>
        <LinkIconContainer>
          <LinkWithIcon to="/">
            Seu carrinho <br /> de compras
          </LinkWithIcon>
          <ShoppingCarIcon />
        </LinkIconContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
