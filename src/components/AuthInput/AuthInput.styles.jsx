import styled from 'styled-components';

const Input = styled.input`
  width: 220px;
  height: 30px;
  padding-left: 12px;
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

  &:focus {
    border: none;
    border-radius: 10px 0px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Input;
