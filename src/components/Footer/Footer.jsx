import {
  FooterContainer,
  FooterWrapper,
  SocialIconsContainer,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinksContainer,
  LinksWrapper,
  LinksColumn,
  FooterLink,
} from './Footer.styles';

const Footer = () => (
  <FooterContainer>
    <FooterWrapper>
      <SocialIconsContainer>
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
      </SocialIconsContainer>
      <LinksContainer>
        <LinksWrapper>
          <LinksColumn>
            <FooterLink to="/seus-anuncios">seus anúncios</FooterLink>
            <FooterLink to="/seu-historico">seu histórico</FooterLink>
            <FooterLink to="/">home</FooterLink>
          </LinksColumn>
          <LinksColumn>
            <FooterLink to="/busca-avancada">busca avançada</FooterLink>
            <FooterLink to="/carrinho-de-compras">
              seu carrinho <br /> de compras
            </FooterLink>
          </LinksColumn>
        </LinksWrapper>
      </LinksContainer>
      <LinksContainer>
        <LinksColumn>
          <FooterLink to="/">termos de publicação</FooterLink>
          <FooterLink to="/">termos de serviço</FooterLink>
          <FooterLink to="/">política de privacidade</FooterLink>
        </LinksColumn>
      </LinksContainer>
    </FooterWrapper>
  </FooterContainer>
);

export default Footer;
