import styled from 'styled-components';

export const DataContainer = styled.div`
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

export const DataWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px 0px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  padding: 5px 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const DataText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const CoverImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  object-position: center;
`;

export const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  object-position: center;
`;
