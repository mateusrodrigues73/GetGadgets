import styled from 'styled-components';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 0 auto;
  padding-bottom: 30px;
`;

export const CartContainer = styled.div`
  width: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  column-gap: 30px;
  margin-bottom: 50px;
`;

export const ItensContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
`;

export const CartItenContainer = styled.div`
  width: 895px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px 0px;
`;

export const ItenImageContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ItenImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  object-position: center;
`;

export const ItenTilleContainer = styled.div`
  max-width: 276px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding: 5px;
`;

export const ItenTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding: 5px;
`;

export const PlusIcon = styled(PlusOutlined)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.contrastLight};
  align-self: flex-start;
`;

export const MinusIcon = styled(MinusOutlined)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.contrastLight};
  align-self: flex-start;
`;

export const CartItenPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 15px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding: 5px;
`;

export const SummaryContainer = styled.div`
  width: 285px;
  height: 400px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px 0px;
`;

export const SummaryTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const SummaryDataContainer = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
`;

export const SummaryDataWrapper = styled.h1`
  width: 100%;
  height: 25px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
`;

export const SummaryPriceContainer = styled.h1`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
`;

export const SummaryPrice = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 30px;
  color: ${({ theme }) => theme.colors.contrastLight};
`;
