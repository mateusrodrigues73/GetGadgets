import PropTypes from 'prop-types';

import {
  LinksContainer,
  LinksWrapper,
  Links,
  ActualPage,
  RightIcon,
} from './Breadcrumbs.styles';

const Breadcrumbs = ({ linksString, actualPage }) => {
  const pairsLinks = linksString.split('|');
  const links = [];

  pairsLinks.forEach((pair) => {
    const [key, value] = pair.split('\\');
    links.push({ key, value });
  });

  return (
    <LinksContainer>
      <LinksWrapper>
        {links.map(({ key, value }) => (
          <>
            <Links key={key} to={key}>
              {value}
            </Links>
            <RightIcon />
          </>
        ))}
        <ActualPage>{actualPage}</ActualPage>
      </LinksWrapper>
    </LinksContainer>
  );
};

Breadcrumbs.propTypes = {
  linksString: PropTypes.string.isRequired,
  actualPage: PropTypes.string.isRequired,
};

export default Breadcrumbs;
