import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const LinkItem = styled(Link)`
  color: ${({ theme }) => theme.colors.contrastLight};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  text-decoration: none;
  padding: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export default LinkItem;
