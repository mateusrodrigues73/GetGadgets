import styled from 'styled-components';

const PreLoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PreLoaderContainer;
