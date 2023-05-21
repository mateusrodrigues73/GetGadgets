import { useContext } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { ThemeContext } from 'styled-components';

import LoaderContainer from './Loader.styles';

const Loader = () => {
  const theme = useContext(ThemeContext);
  const { colors } = theme;
  return (
    <LoaderContainer>
      <LoopCircleLoading size="large" color={colors.contrastLight} />
    </LoaderContainer>
  );
};

export default Loader;
