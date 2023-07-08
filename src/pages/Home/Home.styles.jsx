import styled from 'styled-components';

export const HomeContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: ${window.innerHeight - 300}px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const ProductsContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 30px;
  margin-bottom: 30px;
`;
