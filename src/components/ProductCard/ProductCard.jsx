import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  ProductContainer,
  ProductImage,
  TilleContainer,
  Title,
  Price,
} from './ProductCard.styles';

import AddToCartButton from '../AddToCartButton';

const ProductCard = ({ image, title, price, postId }) => {
  const navigate = useNavigate();

  const goToProductPage = async () => {
    navigate(`/produto/${postId}`);
  };

  const addToCart = () => {};

  return (
    <ProductContainer onClick={goToProductPage}>
      <ProductImage src={image} alt={title} />
      <TilleContainer>
        <Title>{title}</Title>
      </TilleContainer>
      <Price>{price}</Price>
      <AddToCartButton
        width="255px"
        height="25px"
        text="Adicionar ao carrinho"
        onClick={addToCart}
      />
    </ProductContainer>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default ProductCard;
