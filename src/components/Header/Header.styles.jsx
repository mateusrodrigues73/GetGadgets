import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const HeaderWrapper = styled.div`
  width: 1200px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const SearchLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 10px;
`;

export const SearchContainer = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 590px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 0px 20px;
  padding-left: 20px;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 18px;
    color: ${({ theme }) => theme.colors.neutralWith};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const SearchIcon = styled(SearchOutlined)`
  position: absolute;
  font-size: 22.5px;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.neutralWith};

  &:hover {
    cursor: pointer;
    font-size: 27px;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 590px;
  padding: 5px;
`;

export const LinkItem = styled(Link)`
  color: ${({ theme }) => theme.colors.neutralWith};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  text-decoration: none;
  padding: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border-radius: 3px;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ChatButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border: none;
  color: ${({ theme }) => theme.colors.neutralWith};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  padding: 3px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border-radius: 3px;
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const LinkIconContainer = styled.div`
  display: flex;
  column-gap: 20px;
  padding: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border-radius: 3px;
    cursor: pointer;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserIcon = styled(UserOutlined)`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.contrastLight};
`;

export const ShoppingCarIcon = styled(ShoppingCartOutlined)`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.contrastLight};
`;

export const LinkWithIcon = styled(Link)`
  color: ${({ theme }) => theme.colors.neutralWith};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  text-decoration: none;
`;
