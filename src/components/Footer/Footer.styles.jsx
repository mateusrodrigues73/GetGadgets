import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from '@ant-design/icons';

export const FooterContainer = styled.div`
  width: 100%;
  height: 164px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FooterWrapper = styled.div`
  width: 1200px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const SectionTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
  text-align: center;
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 285px;
  height: 133px;
  row-gap: 2rem;
  padding-top: 5px;
`;

export const SocialIconsContainer = styled.div`
  width: 285px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const FacebookIcon = styled(FacebookFilled)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &:active {
    color: ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const InstagramIcon = styled(InstagramFilled)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &:active {
    color: ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const TwitterIcon = styled(TwitterSquareFilled)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};

  &::span {
    width: 50px;
    height: 50px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &:active {
    color: ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 285px;
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const LinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
  row-gap: 11px;
  margin-top: 17px;
`;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.neutralWith};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14 px;
  text-decoration: none;
  padding: 1px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border-radius: 3px;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
