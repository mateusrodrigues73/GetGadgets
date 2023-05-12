import {
  FooterContainer,
  SectionTitle,
  SocialContainer,
  SocialIconsContainer,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from './Footer.styles';

const Footer = () => (
  <FooterContainer>
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
  </FooterContainer>
);

export default Footer;
