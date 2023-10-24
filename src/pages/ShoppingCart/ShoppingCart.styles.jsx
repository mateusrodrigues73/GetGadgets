import styled from 'styled-components';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 336px);
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
  padding: 30px;
  row-gap: 30px;
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

export const RevisionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: auto;
`;

export const RevisionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 20px 0px;
  padding: 30px;
`;

export const RevisionTilleContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px 0px;
`;

export const RevisionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const RevisionItensContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
`;

export const RevisionCartItenContainer = styled.div`
  width: 895px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
`;

export const RevisionItenImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  object-position: center;
`;

export const RevisionActionsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px 0px;
`;

export const PaymentMethodContainer = styled.div`
  width: 895px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px 0px;
  transition: transform 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
    cursor: pointer;
    transform: scale(1.03);
  }
`;

export const PaymentMethodTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
