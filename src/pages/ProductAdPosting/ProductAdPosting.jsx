import { useState } from 'react';

import ProductFormCategory from '../../components/ProductFormCategory';
import ProductFormTitle from '../../components/ProductFormTitle';
import ProductFormData from '../../components/ProductFormData';
import ProductFormSpecs from '../../components/ProductFormSpecs';

import Breadcrumbs from '../../components/Breadcrumbs';

const ProductAdPosting = () => {
  // const { sessionUser } = useContext(AuthContext);
  const [actualStep, setActualStep] = useState(1);
  const linksString = '/\\Home|/seus-anuncios\\Seus anúncios';

  // TODO: fixar eslint-disable-next-line
  // eslint-disable-next-line consistent-return
  const showForm = () => {
    if (actualStep === 1) {
      return (
        <ProductFormCategory
          currentStep={1}
          totalSteps={6}
          setActualStep={setActualStep}
        />
      );
    }
    if (actualStep === 2) {
      return (
        <ProductFormTitle
          currentStep={2}
          totalSteps={6}
          setActualStep={setActualStep}
        />
      );
    }
    if (actualStep === 3) {
      return (
        <ProductFormData
          currentStep={3}
          totalSteps={6}
          setActualStep={setActualStep}
        />
      );
    }
    if (actualStep === 4) {
      return (
        <ProductFormSpecs
          currentStep={4}
          totalSteps={6}
          setActualStep={setActualStep}
        />
      );
    }
  };

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Cadastrar anúncio" />
      {showForm()}
    </>
  );
};

export default ProductAdPosting;
