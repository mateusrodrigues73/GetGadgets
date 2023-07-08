import styled from 'styled-components';
import { ShoppingCartOutlined } from '@ant-design/icons';

export const Button = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.contrastLight},
    ${({ theme }) => theme.colors.contrastDark}
  );
  border: none;
  border-radius: 10px 0px;
  color: ${({ theme }) => theme.colors.neutralWith};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.heading};

  &:hover {
    cursor: pointer;
    font-size: 20px;
    outline: 2px solid ${({ theme }) => theme.colors.neutralWith};
  }

  &:active {
    background: ${({ theme }) => theme.colors.contrastDark};
  }
`;

export const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
