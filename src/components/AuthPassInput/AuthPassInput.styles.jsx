import styled from 'styled-components';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export const PassContainer = styled.div`
  position: relative;
`;

export const HiddenIcon = styled(EyeInvisibleOutlined)`
  position: absolute;
  font-size: 16px;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
    font-size: 19px;
  }
`;

export const ShowIcon = styled(EyeOutlined)`
  position: absolute;
  font-size: 16px;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
    font-size: 19px;
  }
`;
