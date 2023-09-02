import { useState } from 'react';

import ProductFormCategory from '../../components/ProductFormCategory';
import ProductFormTitle from '../../components/ProductFormTitle';
import ProductFormData from '../../components/ProductFormData';
import ProductFormSpecs from '../../components/ProductFormSpecs';
import ProductFormCover from '../../components/ProductFormCover';
import ProductFormImages from '../../components/ProductFormImages';

import Breadcrumbs from '../../components/Breadcrumbs';

const ProductAdPosting = () => {
  const [actualStep, setActualStep] = useState(1);
  const linksString = '/\\Home|/seus-anuncios\\Seus anúncios';

  const formSteps = [
    <ProductFormCategory
      currentStep={1}
      totalSteps={6}
      setActualStep={setActualStep}
    />,
    <ProductFormTitle
      currentStep={2}
      totalSteps={6}
      setActualStep={setActualStep}
    />,
    <ProductFormData
      currentStep={3}
      totalSteps={6}
      setActualStep={setActualStep}
    />,
    <ProductFormSpecs
      currentStep={4}
      totalSteps={6}
      setActualStep={setActualStep}
    />,
    <ProductFormCover
      currentStep={5}
      totalSteps={6}
      setActualStep={setActualStep}
    />,
    <ProductFormImages
      currentStep={6}
      totalSteps={6}
      setActualStep={setActualStep}
    />,
  ];

  const showForm = () => formSteps[actualStep - 1];

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Cadastrar anúncio" />
      {showForm()}
    </>
  );
};

export default ProductAdPosting;
