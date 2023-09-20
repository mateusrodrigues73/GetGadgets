import styled from 'styled-components';
import { DeleteFilled } from '@ant-design/icons';

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

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
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

export const SpecsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

export const SpecWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  background-color: ${({ edit }) =>
    edit === 1
      ? ({ theme }) => theme.colors.primary
      : ({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  border: ${({ edit, theme }) =>
    edit === 1 ? `1px solid ${theme.colors.neutralWith}` : 'none'};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

export const SpecText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const DeleteIcon = styled(DeleteFilled)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.contrastLight};
  position: absolute;
  right: 10px;

  &:hover {
    font-size: 24px;
    cursor: pointer;
    right: 8px;
  }
`;

export const Line = styled.div`
  width: 95%;
  height: 1px;
  border: 1px solid ${({ theme }) => theme.colors.neutralWith};
`;

export const AddSpecInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;
