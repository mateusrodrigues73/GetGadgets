import styled from 'styled-components';

export const ProductContainer = styled.div`
  width: 285px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 15px;
  transition: transform 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export const ProductImage = styled.img`
  width: 255px;
  height: 255px;
  object-fit: contain;
  object-position: center;
`;

export const TilleContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const Price = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.contrastLight};
`;
