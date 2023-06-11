import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

export const ProfileContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 20px 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const UserIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 15px;
`;

export const UserIconWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.neutralWith};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserIcon = styled(UserOutlined)`
  font-size: 80px;
  color: ${({ theme }) => theme.colors.secondaryLight};
  margin-bottom: 10px;
`;
