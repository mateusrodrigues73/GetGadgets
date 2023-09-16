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
            <FooterLink to="/">seus histórico</FooterLink>
            <FooterLink to="/">fóruns</FooterLink>
          </LinksColumn>
          <LinksColumn>
            <FooterLink to="/">busca avançada</FooterLink>
            <FooterLink to="/">
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
