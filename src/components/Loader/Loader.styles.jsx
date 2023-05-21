import styled from 'styled-components';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo com transparência */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default LoaderContainer;
