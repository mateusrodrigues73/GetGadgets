import {
  FooterContainer,
  FooterWrapper,
  SectionTitle,
  SocialContainer,
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
      <SocialContainer>
        <SectionTitle>
          Acompanhe nossas redes <br /> sociais
        </SectionTitle>
        <SocialIconsContainer>
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
        </SocialIconsContainer>
      </SocialContainer>
      <LinksContainer>
        <SectionTitle>Navegue pelo site</SectionTitle>
        <LinksWrapper>
          <LinksColumn>
            <FooterLink to="/">seus anúncios</FooterLink>
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
        <SectionTitle>Termo e políticas</SectionTitle>
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
