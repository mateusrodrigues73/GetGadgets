import { useContext } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { ThemeContext } from 'styled-components';

import PreLoaderContainer from './PreLoader.styles';

const PreLoader = () => {
  const theme = useContext(ThemeContext);
  const { colors } = theme;
  return (
    <PreLoaderContainer>
      <LoopCircleLoading size="large" color={colors.contrastLight} />
    </PreLoaderContainer>
  );
};

export default PreLoader;
