import PropTypes from 'prop-types';

import Title from './AuthTitle.styles';

const AuthTitle = ({ title }) => <Title>{title}</Title>;

AuthTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AuthTitle;
