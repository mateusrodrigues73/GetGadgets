import { useEffect, useContext } from 'react';

import showToast from '../../utils/showToasts';

import { ProductContext } from '../../contexts/ProductProvider';

const ShoppingCart = () => {
  const { postToast, setPostToast } = useContext(ProductContext);

  useEffect(() => {
    if (postToast) {
      showToast(postToast.id, postToast.type, postToast.message);
      setPostToast(null);
    }
  }, []);

  return <div>ShoppingCart</div>;
};

export default ShoppingCart;
