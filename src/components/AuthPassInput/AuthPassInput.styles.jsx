import styled from 'styled-components';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export const PassContainer = styled.div`
  position: relative;
`;

export const HiddenIcon = styled(EyeInvisibleOutlined)`
  position: absolute;
  font-size: 16px;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
    font-size: 19px;
    color: ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const ShowIcon = styled(EyeOutlined)`
  position: absolute;
  font-size: 16px;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
    font-size: 19px;
    color: ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const Input = styled.input`
  width: 220px;
  height: 30px;
  padding-left: 12px;
  padding-right: 35px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralWith};
  outline: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.neutralWith};
  }

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.secondaryLight};

    &::placeholder {
      color: ${({ theme }) => theme.colors.secondaryLight};
    }
  }

  &:focus {
    border: none;
    border-radius: 10px 0px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.neutralWith};

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutralWith};
    }
  }
`;
