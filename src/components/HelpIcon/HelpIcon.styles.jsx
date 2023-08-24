import styled from 'styled-components';
import { QuestionCircleFilled } from '@ant-design/icons';

export const IconContainer = styled.div`
  position: relative;

  &hover {
    cursor: pointer;
  }
`;

export const Icon = styled(QuestionCircleFilled)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const MessageContainer = styled.div`
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

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 20px 0px;
  border: 1px solid ${({ theme }) => theme.colors.neutralWith};
  width: 400px;

  &hover {
    cursor: pointer;
  }
`;

export const Message = styled.p`
  white-space: pre-line;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;
