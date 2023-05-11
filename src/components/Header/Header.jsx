import {
  HeaderContainer,
  Logo,
  SearchInput,
  SearchLinksContainer,
  SearchContainer,
  SearchIcon,
  LinksContainer,
  LinkItem,
} from './Header.styles';

function Header() {
  return (
    <HeaderContainer>
      <Logo src="/images/logo.png" />
      <SearchLinksContainer>
        <SearchContainer>
          <SearchInput placeholder="busque aqui o seu produto" />
          <SearchIcon />
        </SearchContainer>
        <LinksContainer>
          <LinkItem to="/">Fóruns</LinkItem>
          <LinkItem to="/">Seu histórico</LinkItem>
          <LinkItem to="/">Busca avançada</LinkItem>
          <LinkItem to="/">Seus anúncios</LinkItem>
        </LinksContainer>
      </SearchLinksContainer>
    </HeaderContainer>
  );
}

export default Header;
