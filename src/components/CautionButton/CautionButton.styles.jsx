import styled from 'styled-components';

import { DeleteFilled } from '@ant-design/icons';

export const Button = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.colors.error};
  border: none;
  border-radius: 10px 0px;
  color: ${({ theme }) => theme.colors.secondaryDark};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.heading};

  &:hover {
    cursor: pointer;
    font-size: 20px;
    outline: 2px solid ${({ theme }) => theme.colors.neutralWith};
  }

  &:active {
    background: ${({ theme }) => theme.colors.neutralWith};
    outline: none;
  }
`;

export const DeleteIcon = styled(DeleteFilled)``;
