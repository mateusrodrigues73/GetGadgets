import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from '@ant-design/icons';

import { styled } from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  height: 174px;
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
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
  text-align: center;
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 23px;
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FacebookIcon = styled(FacebookFilled)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};
`;

export const InstagramIcon = styled(InstagramFilled)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};
`;

export const TwitterIcon = styled(TwitterSquareFilled)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondaryLight};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
