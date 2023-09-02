import { useContext } from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '../../../components/SectionTitle';

import {
  DataContainer,
  DataWrapper,
  DataText,
  Title,
  CoverImage,
  ImagesContainer,
  ImagesWrapper,
  Image,
} from './ProductFormRevision.styles';

import GradientButton from '../../../components/GradientButton';
import CautionButton from '../../../components/CautionButton';

import { ProductContext } from '../../../contexts/ProductProvider';

const ProductFormRevision = ({ setActualStep }) => {
  const { posting } = useContext(ProductContext);

  const addPosting = () => {
    // TODO: salvar anúncio na base de dados
  };

  const backToForm = () => {
    setActualStep(1);
  };

  return (
    <>
      <SectionTitle title="Revisão dos dados do anúncio" />
      <DataContainer>
        <Title>Dados do Produto:</Title>
        <DataWrapper>
          <DataText>{`Categoria: ${posting.category.categoria}`}</DataText>
        </DataWrapper>
        <DataWrapper>
          <DataText>{`Título: ${posting.title}`}</DataText>
        </DataWrapper>
        <DataWrapper>
          <DataText>{`Modelo: ${posting.data.model}`}</DataText>
        </DataWrapper>
        <DataWrapper>
          <DataText>{`Marca: ${posting.data.brand}`}</DataText>
        </DataWrapper>
        <DataWrapper>
          <DataText>{`Preço: ${posting.data.price}`}</DataText>
        </DataWrapper>
        <DataWrapper>
          <DataText>{`Quantidade: ${posting.data.quantity}`}</DataText>
        </DataWrapper>
      </DataContainer>
      <DataContainer>
        <Title>Informações adicionais</Title>
        {posting.specs.map((s, index) => (
          <DataWrapper key={index}>
            <DataText>{s}</DataText>
          </DataWrapper>
        ))}
      </DataContainer>
      <DataContainer>
        <Title>Capa do anúncio</Title>
        <CoverImage
          src={URL.createObjectURL(posting.cover)}
          alt={posting.cover.name}
        />
      </DataContainer>
      <DataContainer>
        <Title>Imagens do produto</Title>
        <ImagesContainer>
          {posting.images.map((i, index) => (
            <ImagesWrapper key={index}>
              <Image src={URL.createObjectURL(i)} alt={i.name} />
            </ImagesWrapper>
          ))}
        </ImagesContainer>
      </DataContainer>
      <DataContainer>
        <GradientButton
          width="100%"
          height="30px"
          text="Cadastrar anúncio"
          onClick={addPosting}
        />
        <CautionButton
          width="100%"
          height="30px"
          text="Voltar para edição do anúncio"
          onClick={backToForm}
          icon={false}
        />
      </DataContainer>
    </>
  );
};

ProductFormRevision.propTypes = {
  setActualStep: PropTypes.func.isRequired,
};

export default ProductFormRevision;
