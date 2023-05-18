import styled from 'styled-components';

const Input = styled.input`
  width: 220px;
  height: 30px;
  padding-left: 12px;
  padding-right: 12px;
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

export default Input;
