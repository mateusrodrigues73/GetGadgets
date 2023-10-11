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

import { ProductContext } from '../../contexts/ProductProvider';

const ProductCard = ({ image, title, price, postId, sellerId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { getPost, getSeller } = useContext(ProductContext);

  const goToProductPage = async () => {
    setIsLoading(true);
    const post = await getPost(postId);
    if (!post) {
      setIsLoading(false);
      showToast(
        `get-post-error-${postId}`,
        'error',
        'Ocorreu um erro ao carregar o produto! Tente mais tarde'
      );
      return;
    }
    const seller = await getSeller(sellerId);
    if (!seller) {
      setIsLoading(false);
      showToast(
        `get-seller-error-${postId}`,
        'error',
        'Ocorreu um erro ao carregar o produto! Tente mais tarde'
      );
      return;
    }
    setIsLoading(false);
    navigate(`/produto/${title}/${postId}`);
  };

  const addToCart = () => {};

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
  sellerId: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default ProductCard;
