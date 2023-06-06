import PropTypes from 'prop-types';

import { LinksContainer, Links } from './Breadcrumbs.styles';

const Breadcrumbs = ({ linksString }) => {
  const pairsLinks = linksString.split('|');
  const links = [];

  pairsLinks.forEach((pair) => {
    const [key, value] = pair.split('\\');
    links.push({ key, value });
  });

  return (
    <LinksContainer>
      {links.map(({ key, value }) => (
        <Links key={key} to={key}>
          {value}
        </Links>
      ))}
    </LinksContainer>
  );
};

Breadcrumbs.propTypes = {
  linksString: PropTypes.string.isRequired,
};

export default Breadcrumbs;
