import styled from 'styled-components';

export const PostingContainer = styled.div`
  margin: 0 auto;
  width: 590px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 20px 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
  margin-bottom: 50px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding-left: 12px;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  }

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const LinkButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 30px;
  padding-left: 30px;
`;
