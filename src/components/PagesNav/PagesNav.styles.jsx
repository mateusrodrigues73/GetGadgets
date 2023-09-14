import styled from 'styled-components';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

export const NavContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;
`;

export const NavWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  padding: 3px 15px;
  border-radius: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  padding: 0px 2px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    cursor: pointer;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.contrastLight};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0px;
`;

export const RightIcon = styled(RightOutlined)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.contrastLight};
`;

export const LeftIcon = styled(LeftOutlined)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.contrastLight};
`;
