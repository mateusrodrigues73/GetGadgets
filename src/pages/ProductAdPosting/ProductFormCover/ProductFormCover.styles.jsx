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

export const CoverImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  object-position: center;
`;

export const LinkButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 30px;
  padding-left: 30px;
`;
