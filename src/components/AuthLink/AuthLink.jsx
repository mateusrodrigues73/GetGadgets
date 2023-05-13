import PropTypes from 'prop-types';

import LinkItem from './AuthLink.styles';

const AuthLink = ({ text, to }) => <LinkItem to={to}>{text}</LinkItem>;

AuthLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default AuthLink;
