import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

export const ProductContainer = styled.div`
  width: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const ProductWrapper = styled.div`
  width: 1200px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px 0px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
`;

export const ImagesWrapper = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
`;

export const Images = styled.img`
  width: 65px;
  height: 65px;
  object-fit: contain;
  object-position: center;

  &:hover {
    cursor: pointer;
  }
`;

export const CenterImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  object-position: center;
`;

export const ProductData = styled.div`
  width: 295px;
  height: 400px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 20px 0px;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const Price = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 30px;
  color: ${({ theme }) => theme.colors.contrastLight};
`;

export const SellerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 15px;
`;

export const SellerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 15px;
`;

export const SellerIconWrapper = styled.div`
  width: 90px;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.neutralWith};
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SellerIcon = styled(UserOutlined)`
  font-size: 70px;
  color: ${({ theme }) => theme.colors.secondaryLight};
  margin-bottom: 10px;
`;

export const SellerImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50px;
`;

export const SellerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 15px;
`;

export const SellerInfo = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const SpecsContainer = styled.div`
  width: 290px;
  height: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: flex-start;
  justify-content: start;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 20px 0px;
`;

export const SpecsWrapper = styled.div`
  width: 290px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: flex-start;
  justify-content: start;
`;

export const Spec = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
