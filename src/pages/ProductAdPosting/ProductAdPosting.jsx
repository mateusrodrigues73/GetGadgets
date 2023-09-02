import { useState } from 'react';

import ProductFormCategory from './ProductFormCategory';
import ProductFormTitle from './ProductFormTitle';
import ProductFormData from './ProductFormData';
import ProductFormSpecs from './ProductFormSpecs';
import ProductFormCover from './ProductFormCover';
import ProductFormImages from './ProductFormImages';
import ProductFormRevision from './ProductFormRevision';

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
    <ProductFormRevision setActualStep={setActualStep} />,
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
