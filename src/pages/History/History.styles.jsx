import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 336px);
  width: 0 auto;
  padding-bottom: 30px;
`;

export const HistoricContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HistoricWrapper = styled.div`
  width: 1200px;
  padding: 30px;
  row-gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px 0px;
  margin-bottom: 30px;
`;

export const HistoricTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
  align-self: flex-start;
`;

export const ItenContainer = styled.div`
  width: 1140px;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 20px 0px;
`;

export const ItenImage = styled.img`
  width: 135px;
  height: 100;
  object-fit: contain;
  object-position: center;
`;

export const ItenDataContainer = styled.div`
  width: 295px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const ItenData = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const UserContainer = styled.div`
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 10px 0px;
`;

export const UserTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
  align-self: flex-start;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const UserIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.neutralWith};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserIcon = styled(UserOutlined)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};
  margin-bottom: 7px;
`;

export const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const UserDataContainer = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const StatusContainer = styled.div`
  width: 325px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 7px;
`;

export const StatusTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
  text-align: center;
`;

export const StatusMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutralWith};
  text-align: center;
`;

export const HistoricDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
`;

export const HistoricData = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
