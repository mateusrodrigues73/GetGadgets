import { useState } from 'react';

import { PostingContainer, Title, Input } from './ProductAdPosting.styles';

const ProductAdPosting = () => {
  // eslint-disable-next-line no-unused-vars
  const [categoria, setCategoria] = useState('Selecione uma categoria');

  const changeCategory = () => {};

  return (
    <PostingContainer>
      <Title>Selecione a categoria do produto</Title>
      <Input type="text" defaultValue={categoria} onClick={changeCategory} />
    </PostingContainer>
  );
};

export default ProductAdPosting;
