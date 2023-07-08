import PropTypes from 'prop-types';

import {
  ProductContainer,
  ProductImage,
  TilleContainer,
  Title,
  Price,
} from './ProductCard.styles';

import AddToCartButton from '../AddToCartButton';

const ProductCard = ({ image, title, price }) => {
  const productPage = () => {};

  return (
    <ProductContainer>
      <ProductImage src={image} alt={title} />

      <TilleContainer>
        <Title>{title}</Title>
      </TilleContainer>
      <Price>{price}</Price>
      <AddToCartButton
        width="255px"
        height="25px"
        text="Comprar"
        onClick={productPage}
      />
    </ProductContainer>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;
