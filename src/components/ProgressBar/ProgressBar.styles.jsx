import styled from 'styled-components';

export const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 15px;
`;

export const ActualStep = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.contrastLight};
`;

export const Step = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
`;
