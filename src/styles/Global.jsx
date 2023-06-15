import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(45deg, #D9EBEE, #5299F2);
    background-repeat: no-repeat;
  }

  ::-moz-placeholder {
    opacity:  1;1 
  }

`;

export default GlobalStyle;
