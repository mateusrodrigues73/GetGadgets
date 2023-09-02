import styled from 'styled-components';
import { DeleteFilled } from '@ant-design/icons';

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
  position: relative;
  margin-bottom: 15px;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  object-position: center;
`;

export const DeleteIcon = styled(DeleteFilled)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.contrastLight};
  position: absolute;
  bottom: -25px;

  &:hover {
    font-size: 24px;
    cursor: pointer;
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
