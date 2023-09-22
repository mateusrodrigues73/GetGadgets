import { useRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

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

import Breadcrumbs from '../../components/Breadcrumbs';
import GradientButton from '../../components/GradientButton';
import CautionButton from '../../components/CautionButton';
import Loader from '../../components/Loader';

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
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState(false);
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isValidSpecs, setIsValidSpecs] = useState(false);
  const linksString = '/\\Home|/seus-anuncios\\Seus anúncios';
  const { id } = useParams();
  const postingId = Number(id);
  const addSpecInputRef = useRef(null);
  const {
    userPostings,
    getUserPost,
    updatePostData,
    updatePostSpecs,
    updatePostCover,
    deletePostImage,
    postToast,
    setPostToast,
  } = useContext(ProductContext);

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

  const updateData = async () => {
    if (
      post.categoria === categoria &&
      post.titulo === titulo &&
      post.modelo === modelo &&
      post.marca === marca &&
      post.preco === preco &&
      post.quantidade === quantidade
    ) {
      showToast('post-edit-data-equal-warn', 'warn', 'Nada a ser alterado!');
    } else if (isValid) {
      const postData = {
        categoria,
        titulo,
        marca,
        modelo,
        preco,
        quantidade,
      };
      setIsLoading(true);
      await updatePostData(postData);
      setIsLoading(false);
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
    if (isValidSpecs) {
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
        setIsValidSpecs(false);
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

  const updateSpecs = async () => {
    if (specs.length < 3) {
      showToast(
        'post-edit-specs-min-warn',
        'warn',
        'Você deve adicionar no mínimo 3 especificações!'
      );
    } else {
      const specsChanged = isSpecsChanged();
      if (specsChanged) {
        setIsLoading(true);
        await updatePostSpecs(specs, postingId);
        setIsLoading(false);
      } else {
        showToast(
          'post-edit-specs-no-edit-warn',
          'warn',
          'Nada a ser alterado!'
        );
      }
    }
  };

  const changeCover = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (imageValidate(file)) {
        setIsLoading(true);
        await updatePostCover(file, capa, postingId);
        setIsLoading(false);
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

  const deleteImage = async (data, imageUrl) => {
    const key = Object.keys(data)[0];
    const nullData = data;
    nullData[key] = null;
    setIsLoading(true);
    await deletePostImage(nullData, imageUrl, postingId);
    setIsLoading(false);
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
      {imagens.map(
        (i, index) =>
          Object.values(i)[0] !== null && (
            <ImagesWrapper key={index}>
              <Image
                src={Object.values(i)[0]}
                alt={`Imagem ${index + 1}`}
                onClick={() => changeImage(index)}
              />
              <DeleteImageIcon
                onClick={() => {
                  deleteImage(i, Object.values(i)[0]);
                }}
              />
            </ImagesWrapper>
          )
      )}
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
      { imagem1: postImages.imagem1 },
      { imagem2: postImages.imagem2 },
      { imagem3: postImages.imagem3 },
      { imagem4: postImages.imagem4 },
      { imagem5: postImages.imagem5 },
    ].filter((image) => image !== null);
    const isAllImagesNull = arrayOfImages.every(
      (item, index) => item[`imagem${index + 1}`] === null
    );
    if (isAllImagesNull) {
      setImagens(null);
    } else {
      setImagens(arrayOfImages);
    }
    setCapa(postImages.capa);
    setLoadedData(true);
    setIsValid(false);
  };

  useEffect(() => {
    setPost(getUserPost(postingId));
    if (postToast) {
      showToast(postToast.id, postToast.type, postToast.message);
      setPostToast(null);
    }
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
  }, [categoria, titulo, marca, modelo, preco, quantidade]);

  useEffect(() => {
    setIsValidSpecs(validateSpec(spec, setMessage, setMessageId));
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
                src={capa}
                alt="Capa do anúncio"
                onClick={changeCover}
              />
            )}
            <Title>Imagens do produto</Title>
            {imagens === null && <Title>Seu produto não possui imagens</Title>}
            {imagens !== null && imagens.length > 0 && renderImages()}
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
      {isLoading && <Loader />}
    </>
  );
};

export default UserProductEdit;
