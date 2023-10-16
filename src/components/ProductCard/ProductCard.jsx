import { useState, useContext } from 'react';
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
import Loader from '../Loader';

import showToast from '../../utils/showToasts';

import { AuthContext } from '../../contexts/AuthProvider';
import { ProductContext } from '../../contexts/ProductProvider';

const ProductCard = ({ image, title, price, postId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { sessionUser } = useContext(AuthContext);
  const { userCartItensIds, addProductToCart } = useContext(ProductContext);
  const navigate = useNavigate();

  const goToProductPage = async () => {
    navigate(`/produto/${postId}`);
  };

  const addToCart = async (event) => {
    event.stopPropagation();
    if (!sessionUser) {
      showToast(
        `add_product-direct-to-cart-unlogged-warning-${postId}`,
        'warn',
        'Você deve estar logado para adicionar produtos no seu carrinho'
      );
    } else if (userCartItensIds && !userCartItensIds.includes(postId)) {
      setIsLoading(true);
      await addProductToCart(postId);
      setIsLoading(false);
    } else {
      navigate('/carrinho-de-compras');
    }
  };

  return (
    <>
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
      {isLoading && <Loader />}
    </>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default ProductCard;
