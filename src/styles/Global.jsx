import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(
      45deg, 
      ${({ theme }) => theme.colors.neutralWith},
      ${({ theme }) => theme.colors.secondaryLight}
    );
    background-repeat: no-repeat;
  }

  ::-moz-placeholder {
    opacity:  1;
  }

`;

export default GlobalStyle;
