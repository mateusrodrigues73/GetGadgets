import styled from 'styled-components';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export const PageContainer = styled.div`
  min-height: calc(100vh - 406px);
  width: 0 auto;
  padding-bottom: 30px;
`;

export const CenterContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 20px;
`;

export const ProductsContainer = styled.div`
  margin: 0 auto;
  max-width: 895px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 30px;
  margin-bottom: 30px;
`;

export const FiltersContainer = styled.div`
  width: 285px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px 0px;
`;

export const FilterTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  padding-left: 15px;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.neutralWith};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  }
`;

export const SelectorContainer = styled.div`
  width: 100%;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 10px 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
    border-radius: 00px 0px 0px 10px;
    cursor: pointer;
  }
`;

export const SelectedIten = styled.p`
  margin-left: 15px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const DownIcon = styled(DownOutlined)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
  position: absolute;
  right: 7px;
  top: 3px;
`;

export const UpIcon = styled(UpOutlined)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
  position: absolute;
  right: 7px;
  top: 3px;
`;

export const ItensToSelectContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralWith};
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 10px 0px 0px 0px;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: ${({ top }) => top};
`;

export const ItenToSelectWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 0px 10px;
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ItenToSelect = styled.p`
  margin-left: 10px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const FilterSectionLine = styled.div`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.neutralWith};
`;

export const NoProductsFindTitleContainer = styled.div`
  margin: 0 auto;
  width: 895px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 20px 0px;
`;

export const NoProductsFindTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 28px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
