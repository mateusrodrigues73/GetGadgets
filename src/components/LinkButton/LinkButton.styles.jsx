import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  color: ${({ theme }) => theme.colors.contrastLight};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.heading};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.neutralWith};
  }
`;

export default Button;
