import styled from 'styled-components';

const Button = styled.button`
  background-color: pink;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default Button;
