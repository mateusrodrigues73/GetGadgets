import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 388px);
  width: 0 auto;
  padding-bottom: 30px;
`;

export const PostingsContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 30px;
  margin-bottom: 30px;
`;

export const PostingContainer = styled.div`
  width: 285px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 15px;
  transition: transform 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export const PostingImage = styled.img`
  width: 255px;
  height: 255px;
  object-fit: contain;
  object-position: center;
`;

export const TilleContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
