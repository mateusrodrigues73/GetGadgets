import styled from 'styled-components';

export const ForgotPassContainer = styled.div`
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
  row-gap: 3rem;
`;

export const ForgotPassWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
  padding-left: 12px;
`;

export const Message = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
  text-align: center;
`;
