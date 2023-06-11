import PropTypes from 'prop-types';

import { TitleContainer, TitleWrapper, Title } from './SectionTitle.styles';

const SectionTitle = ({ title }) => (
  <TitleContainer>
    <TitleWrapper>
      <Title>{title}</Title>
    </TitleWrapper>
  </TitleContainer>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
