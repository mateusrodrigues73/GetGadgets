import styled from 'styled-components';

export const ErrorContainer = styled.div`
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: ${window.innerWidth - window.innerWidth * 0.9}px;
`;

export const ErrorWrapper = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 30px 0px;
  padding: 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1.5rem;
`;

export const ErrorTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const ErrorMessage = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
  text-align: center;
`;
