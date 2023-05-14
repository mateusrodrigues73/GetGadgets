import styled from 'styled-components';

export const SignUpContainer = styled.div`
  margin: 0 auto;
  width: 286px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 30px 0px;
  box-shadow: 8px 8px 4px 1px rgba(15, 14, 14, 0.5);
  margin-bottom: 9%;
  padding: 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1.5rem;
`;

export const SignUpWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
  padding-left: 12px;
`;
