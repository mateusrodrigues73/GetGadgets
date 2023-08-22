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

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const SelectInput = styled.input`
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding-left: 15px;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

export const CategoriesPickerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const CategoriesPickerWrapper = styled.div`
  width: 550px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 30px 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
`;

export const LinkButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 30px;
`;
