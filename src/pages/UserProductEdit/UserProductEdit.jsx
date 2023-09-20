import { useRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs';
import Loader from '../../components/Loader';

import {
  DataContainer,
  Title,
  CategoriesPickerContainer,
  CategoriesPickerWrapper,
  SelectInput,
  Input,
  SpecsContainer,
  SpecWrapper,
  SpecText,
  DeleteIcon,
  Line,
  AddSpecInputContainer,
  CoverImage,
  ImagesContainer,
  ImagesWrapper,
  Image,
  DeleteImageIcon,
} from './UserProductEdit.styles';

import GradientButton from '../../components/GradientButton';
import CautionButton from '../../components/CautionButton';

import showToast from '../../utils/showToasts';
import imageValidate from '../../utils/imageValidate';

import productCategories from '../../data/productCategories';

import { validateData, validateSpec } from './validatePost';

import { ProductContext } from '../../contexts/ProductProvider';

const UserProductEdit = () => {
  const [post, setPost] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [pickCategories, setPickCategories] = useState(false);
  const [titulo, setTitulo] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [preco, setPreco] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [spec, setSpec] = useState('');
  const [indexSpec, setIndexSpec] = useState(null);
  const [specs, setSpecs] = useState([]);
  const [editTrigger, setEditTrigger] = useState(false);
  const [capa, setCapa] = useState(null);
  const [imagens, setImagens] = useState(null);
  const [loadedData, setLoadedData] = useState(false);
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const linksString = '/\\Home|/seus-anuncios\\Seus anúncios';
  const { id } = useParams();
  const postingId = Number(id);
  const addSpecInputRef = useRef(null);
  const { userPostings, getUserPost } = useContext(ProductContext);

  const changeCategory = () => {
    setPickCategories(true);
  };

  const chooseCategory = (category) => {
    setCategoria(category.categoria);
    setPickCategories(false);
  };

  const showCategories = () => (
    <CategoriesPickerContainer>
      <CategoriesPickerWrapper>
        {productCategories.map((category) => (
          <SelectInput
            key={category.categoria}
            type="text"
            defaultValue={`${category.categoria}: ${category.descricao}`}
            onClick={() => chooseCategory(category)}
          />
        ))}
      </CategoriesPickerWrapper>
    </CategoriesPickerContainer>
  );

  const handleTitleChange = (event) => {
    const { value } = event.target;
    if (value.length > 80) {
      event.preventDefault();
      return;
    }
    setTitulo(value);
  };

  const handleBrandChange = (event) => {
    const { value } = event.target;
    if (value.length > 50) {
      event.preventDefault();
      return;
    }
    setMarca(value);
  };

  const handleModelChange = (event) => {
    const { value } = event.target;
    if (value.length > 50) {
      event.preventDefault();
      return;
    }
    setModelo(value);
  };

  const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    if (numericValue.length > 7) {
      event.preventDefault();
    } else if (numericValue !== '') {
      const formattedValue = (parseFloat(numericValue) / 100).toLocaleString(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
        }
      );
      setPreco(formattedValue === 'R$ 0,00' ? '' : formattedValue);
    }
  };

  const handleQuantityChange = (event) => {
    const inputValue = event.target.value;
    if (!/^[0-9]*$/.test(inputValue) && inputValue !== String.fromCharCode(8)) {
      event.preventDefault();
      return;
    }
    if (inputValue.length > 4) {
      event.preventDefault();
      return;
    }
    setQuantidade(inputValue);
  };

  const updateData = () => {
    if (
      post.titulo === titulo &&
      post.modelo === modelo &&
      post.marca === marca &&
      post.preco === preco &&
      post.quantidade === quantidade
    ) {
      showToast('post-edit-data-equal-warn', 'warn', 'Nada a ser alterado!');
    } else if (isValid) {
      // TODO: atualizar dados do post na base de dados
      showToast('succes', 'success', 'success');
      setIsValid(false);
    } else {
      showToast(messageId, 'warn', message);
    }
  };

  const deleteSpec = (index) => {
    if (indexSpec !== null && indexSpec !== index) {
      showToast(
        'post-delit-spec-before-edit-warn',
        'warn',
        'Você deve finalizar e edição da informação atual antes de excluir outra'
      );
    } else {
      specs.splice(index, 1);
      setIndexSpec(null);
      setSpec('');
      addSpecInputRef.current.blur();
      setEditTrigger(!editTrigger);
    }
  };

  const calcelEditSpec = () => {
    setIndexSpec(null);
    setSpec('');
  };

  const addSpec = () => {
    if (isValid) {
      if (specs.length === 10) {
        showToast(
          'post-edit-specs-max-warn',
          'warn',
          'Você já atingiu o limite de 10 especificações!'
        );
      } else {
        if (indexSpec) {
          specs[indexSpec] = spec;
          setIndexSpec(null);
        } else {
          specs.push(spec);
        }
        setSpec('');
        setIsValid(false);
      }
    } else {
      showToast(messageId, 'warn', message);
    }
  };

  const editSpec = (index) => {
    setIndexSpec(index);
    setSpec(specs[index]);
    addSpecInputRef.current.focus();
  };

  const renderSpecs = () => (
    <SpecsContainer>
      {specs.map((s, index) => (
        <SpecWrapper
          key={index}
          edit={indexSpec === index ? 1 : 0}
          onClick={() => editSpec(index)}
        >
          <SpecText>{s}</SpecText>
          <DeleteIcon
            onClick={(e) => {
              e.stopPropagation();
              deleteSpec(index);
            }}
          />
        </SpecWrapper>
      ))}
    </SpecsContainer>
  );

  const handleSpecChange = (event) => {
    const { value } = event.target;
    if (value.length > 50) {
      event.preventDefault();
      return;
    }
    setSpec(value);
    if (indexSpec) {
      specs[indexSpec] = value;
    }
  };

  const isSpecsChanged = () => {
    if (specs.length !== post.produto_informacoes.length) {
      return true;
    }
    return specs.every((s, i) => s !== post.produto_informacoes[i].informacao);
  };

  const updateSpecs = () => {
    if (specs.length < 3) {
      showToast(
        'post-edit-specs-min-warn',
        'warn',
        'Você deve adicionar no mínimo 3 especificações!'
      );
    } else {
      const specsChanged = isSpecsChanged();
      if (specsChanged) {
        // TODO: atualizar specs do post na base de dados
        showToast('succes', 'success', 'success');
      } else {
        showToast(
          'post-edit-specs-no-edit-warn',
          'warn',
          'Nada a ser alterado!'
        );
      }
    }
  };

  const changeCover = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (imageValidate(file)) {
        setCapa(file);
      }
    });
    fileInput.click();
  };

  const changeImage = (index) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (imageValidate(file)) {
        imagens[index] = file;
        setEditTrigger(!editTrigger);
      }
    });
    fileInput.click();
  };

  const deleteImage = (index) => {
    imagens.splice(index, 1);
    setEditTrigger(!editTrigger);
  };

  const addImage = () => {
    if (imagens.length < 5) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (imageValidate(file)) {
          imagens.push(file);
          setEditTrigger(!editTrigger);
        }
      });
      fileInput.click();
    } else {
      showToast(
        'product-form-specs-limit-warn',
        'warn',
        'Você já atingiu o limite de 5 imagens!'
      );
    }
  };

  const renderImages = () => (
    <ImagesContainer>
      {imagens.map((i, index) => (
        <ImagesWrapper key={index}>
          <Image
            src={typeof i === 'string' ? i : URL.createObjectURL(i)}
            alt={`Imagem ${i + 1}`}
            onClick={() => changeImage(index)}
          />
          <DeleteImageIcon
            onClick={() => {
              deleteImage(index);
            }}
          />
        </ImagesWrapper>
      ))}
    </ImagesContainer>
  );

  const updateImages = () => {
    const postImages = post.produto_imagens[0];
    const initialCover = postImages.capa;
    const initialImages = [
      postImages.imagem1,
      postImages.imagem2,
      postImages.imagem3,
      postImages.imagem4,
      postImages.imagem5,
    ].filter((image) => image !== null);
    const coverChanged = initialCover !== capa;
    const imagesChanged =
      JSON.stringify(initialImages) !== JSON.stringify(imagens);
    if (!coverChanged && !imagesChanged) {
      showToast(
        'post-edit-images-no-edit-warn',
        'warn',
        'Nada a ser alterado!'
      );
    } else {
      // TODO: atualizar imagens do post na base de dados
      showToast('succes', 'success', 'success');
    }
  };

  const loadData = () => {
    setCategoria(post.categoria);
    setTitulo(post.titulo);
    setMarca(post.marca);
    setModelo(post.modelo);
    setPreco(post.preco);
    setQuantidade(post.quantidade);
    setSpecs(post.produto_informacoes.map((i) => i.informacao));
    const postImages = post.produto_imagens[0];
    const arrayOfImages = [
      postImages.imagem1,
      postImages.imagem2,
      postImages.imagem3,
      postImages.imagem4,
      postImages.imagem5,
    ].filter((image) => image !== null);
    setImagens(arrayOfImages);
    setCapa(postImages.capa);
    setLoadedData(true);
    setIsValid(false);
  };

  useEffect(() => {
    setPost(getUserPost(postingId));
  }, [userPostings]);

  useEffect(() => {
    if (post !== null) {
      // TODO: remover console
      // eslint-disable-next-line no-console
      console.log(post);
      loadData();
    }
  }, [post]);

  useEffect(() => {}, [indexSpec]);

  useEffect(() => {
    setIsValid(
      validateData(
        titulo,
        marca,
        modelo,
        preco,
        quantidade,
        setMessage,
        setMessageId
      )
    );
  }, [titulo, marca, modelo, preco, quantidade]);

  useEffect(() => {
    setIsValid(validateSpec(spec, setMessage, setMessageId));
  }, [spec]);

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Editar anúncio" />
      {loadedData && (
        <>
          <DataContainer>
            <SelectInput
              type="text"
              readOnly
              value={categoria}
              onClick={changeCategory}
            />
            <Input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={handleTitleChange}
            />
            <Input
              type="text"
              placeholder="Marca"
              value={marca}
              onChange={handleBrandChange}
            />
            <Input
              type="text"
              placeholder="Modelo"
              value={modelo}
              onChange={handleModelChange}
            />
            <Input
              type="text"
              placeholder="Preço"
              value={preco}
              onChange={handlePriceChange}
            />
            <Input
              type="text"
              placeholder="Quantidade"
              value={quantidade}
              onChange={handleQuantityChange}
            />
            <GradientButton
              width="100%"
              height="30px"
              text="Salvar alterações"
              onClick={updateData}
            />
          </DataContainer>
          <DataContainer>
            <Title>Informações adicionais</Title>
            {specs.length !== 0 && renderSpecs()}
            {specs.length !== 0 && <Line />}
            <AddSpecInputContainer>
              <Input
                type="text"
                placeholder="Adicionar especificação"
                value={spec}
                onChange={handleSpecChange}
                ref={addSpecInputRef}
              />
              <GradientButton
                width="100%"
                height="30px"
                text={indexSpec ? 'Editar ' : 'Adicionar'}
                onClick={addSpec}
              />
              {indexSpec !== null && (
                <CautionButton
                  width="100%"
                  height="30px"
                  text="Cancelar"
                  onClick={calcelEditSpec}
                  icon={false}
                />
              )}
              <GradientButton
                width="100%"
                height="30px"
                text="Salvar alterações"
                onClick={updateSpecs}
              />
            </AddSpecInputContainer>
          </DataContainer>
          <DataContainer>
            <Title>Capa do anúncio</Title>
            {capa && (
              <CoverImage
                src={
                  typeof capa === 'string' ? capa : URL.createObjectURL(capa)
                }
                alt="Capa do anúncio"
                onClick={changeCover}
              />
            )}
            <Title>Imagens do produto</Title>
            {imagens && imagens.length === 0 && (
              <Title>Seu produto não possui imagens</Title>
            )}
            {imagens && imagens.length > 0 && renderImages()}
            <GradientButton
              width="100%"
              height="30px"
              text="Adicionar imagem"
              onClick={addImage}
            />
            <GradientButton
              width="100%"
              height="30px"
              text="Salvar alterações"
              onClick={updateImages}
            />
          </DataContainer>
        </>
      )}
      {pickCategories && showCategories()}
      {!loadedData && <Loader />}
    </>
  );
};

export default UserProductEdit;
