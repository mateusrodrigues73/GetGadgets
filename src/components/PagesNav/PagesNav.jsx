import React from 'react';
import PropTypes from 'prop-types';

import {
  NavContainer,
  NavWrapper,
  ButtonContainer,
  Text,
  IconsContainer,
  RightIcon,
  LeftIcon,
} from './PagesNav.styles';

export const PagesNav = ({ currentPage, totalPages, goPrevious, goNext }) => (
  <NavContainer>
    <NavWrapper>
      {currentPage !== 1 && (
        <ButtonContainer onClick={goPrevious}>
          <IconsContainer>
            <LeftIcon />
            <LeftIcon />
          </IconsContainer>
          <Text>Página Anterior</Text>
        </ButtonContainer>
      )}
      {currentPage !== totalPages && (
        <ButtonContainer onClick={goNext}>
          <Text>Próxima Página</Text>
          <IconsContainer>
            <RightIcon />
            <RightIcon />
          </IconsContainer>
        </ButtonContainer>
      )}
    </NavWrapper>
  </NavContainer>
);

PagesNav.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goNext: PropTypes.func.isRequired,
  goPrevious: PropTypes.func.isRequired,
};

export default PagesNav;
