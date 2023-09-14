import styled from 'styled-components';
import { PlusCircleFilled } from '@ant-design/icons';

export const Icon = styled(PlusCircleFilled)`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.neutralWith};
`;

export const Text = styled.p`
  font-size: ${({ fontSize }) => (!fontSize ? '28px' : fontSize)};
  color: ${({ theme }) => theme.colors.neutralWith};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const ButtonContainer = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.contrastLight},
    ${({ theme }) => theme.colors.contrastDark}
  );
  border-radius: ${({ radius }) => (!radius ? '20px 0px' : radius)};
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;

  &:hover {
    cursor: pointer;
    outline: 2px solid ${({ theme }) => theme.colors.neutralWith};

    & ${Icon} {
      font-size: 60px;
    }

    & ${Text} {
      transform: scale(1.05);
    }
  }
`;
