import styled from 'styled-components';

export const LoginContainer = styled.div`
  margin: 0 auto;
  width: 286px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 30px 0px;
  box-shadow: 8px 8px 4px 1px rgba(15, 14, 14, 0.5);
  margin-bottom: 9%;
  padding: 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1.5rem;
`;

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
  padding-left: 12px;
`;

export const Checkbox = styled.input`
  width: 13px;
  height: 13px;
  margin-right: 6px;
  cursor: pointer;
`;

export const CheckBoxText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const OuContainer = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const OuLine = styled.div`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralWith};
  width: 100%;
`;

export const OuText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
  margin-left: 18px;
  margin-right: 18px;
`;
