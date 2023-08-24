import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

export const LinksContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export const LinksWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  display: inline-block;
  padding: 3px 15px 3px 15px;
  border-radius: 20px;
`;

export const ActualPage = styled.span`
  color: ${({ theme }) => theme.colors.neutralWith};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
`;

export const Links = styled(Link)`
  color: ${({ theme }) => theme.colors.contrastLight};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  text-decoration: none;
  padding-left: 2px;
  padding-right: 2px;
  margin-right: 15px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export const RightIcon = styled(RightOutlined)`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.secondaryDark};
  margin-right: 15px;
`;
