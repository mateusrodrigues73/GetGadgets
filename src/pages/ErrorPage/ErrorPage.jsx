import {
  ErrorContainer,
  ErrorWrapper,
  ErrorTitle,
  ErrorMessage,
} from './ErroPage.styles';

import AuthLink from '../../components/AuthLink';

const ErrorPage = () => (
  <ErrorContainer>
    <ErrorWrapper>
      <ErrorTitle>Ops! Página não encontrada</ErrorTitle>
      <ErrorMessage>
        Parece que não encontramos a página que você está procurando
      </ErrorMessage>
      <ErrorMessage>
        Verifique se a URL está correta ou retorne à página inicial.
      </ErrorMessage>
      <AuthLink to="/" text="Ir para Home" />
    </ErrorWrapper>
  </ErrorContainer>
);

export default ErrorPage;
