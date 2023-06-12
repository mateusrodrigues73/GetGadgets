import styled from 'styled-components';
import { UserOutlined, EditFilled } from '@ant-design/icons';

export const ProfileContainer = styled.div`
  margin: 0 auto;
  width: 438px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 20px 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: relative;
`;

export const InputName = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.neutralWith};
  margin-left: 15px;
`;

export const Input = styled.input`
  width: 377px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding-left: 15px;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const EditIcon = styled(EditFilled)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.contrastLight};
  position: absolute;
  right: 10px;
  top: 35px;

  &:hover {
    cursor: pointer;
    font-size: 23px;
    right: 7.5px;
    top: 32.5px;
  }
`;
