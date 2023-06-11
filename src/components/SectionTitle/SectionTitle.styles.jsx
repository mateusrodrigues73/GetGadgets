import styled from 'styled-components';

export const TitleContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  width: 1200px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  padding-left: 20px;
  border-radius: 20px 0px;
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
