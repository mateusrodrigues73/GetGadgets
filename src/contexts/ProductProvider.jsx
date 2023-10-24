import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import PreLoader from '../components/PreLoader';

import { SupabaseContext } from './SupabaseProvider';
import { AuthContext } from './AuthProvider';

import showToast from '../utils/showToasts';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [lastProducts, setLastproducts] = useState(null);
  const [allProducts, setAllproducts] = useState(null);
  const [productsSearch, setProductsSearch] = useState(null);
  const [textSearch, setTextSearch] = useState(null);
  const [userPostings, setUserPostings] = useState(null);
  const [userCartItens, setUserCartItens] = useState(null);
  const [cartTotalPrice, setCartTotalPrice] = useState(null);
  const [cartTotalItens, setCartTotalItens] = useState(null);
  const [userCartItensIds, setUserCartItensIds] = useState(null);
  const [postToast, setPostToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const { supabase } = useContext(SupabaseContext);
  const { sessionUser, saveLocalStorage, deleteLocalStorage } =
    useContext(AuthContext);
  const posting = {};
  const navigate = useNavigate();

  const getUserPostings = async () => {
    setLoading(true);
    saveLocalStorage();
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*, produto_imagens(*), produto_informacoes(*)')
        .eq('id_usuario', sessionUser.id)
        .order('created_at', { ascending: true });
      if (error) {
        throw new Error(error);
      }
      deleteLocalStorage();
      setLoading(false);
      setUserPostings(data.length > 0 ? data : null);
    } catch (error) {
      deleteLocalStorage();
      setLoading(false);
      setUserPostings(null);
    }
  };

  const getUserPost = (postingId) => {
    if (sessionUser) {
      if (userPostings && userPostings.length > 0) {
        const userPost = userPostings.find((p) => p.id === postingId);
        return userPost || null;
      }
      return null;
    }
    navigate('/');
    return null;
  };

  const insertSpecs = async (productId, specs) => {
    for (const spec of specs) {
      const { error } = await supabase
        .from('produto_informacoes')
        .insert({ produto_id: productId, informacao: spec });
      if (error) {
        return false;
      }
    }
    return true;
  };

  const uploadProductImages = async (productId, cover, images) => {
    for (const image of images) {
      const { error } = await supabase.storage
        .from('produtos')
        .upload(`${sessionUser.id}/${productId}/${image.name}`, image, {
          upsert: true,
        });
      if (error) {
        return false;
      }
    }
    const { error } = await supabase.storage
      .from('produtos')
      .upload(`${sessionUser.id}/${productId}/${cover.name}`, cover, {
        upsert: true,
      });
    if (error) {
      return false;
    }
    return true;
  };

  const insertProdutcImages = async (productId, cover, images) => {
    const baseUrl = `https://apovoiknbwujzmlwpvzo.supabase.co/storage/v1/object/public/produtos/`;
    const imagesUrl = `${baseUrl}${sessionUser.id}/${productId}/`;
    const { error } = await supabase.from('produto_imagens').insert({
      id_produto: productId,
      capa: `${imagesUrl}${cover.name}`,
      imagem1: images[0] ? `${imagesUrl}${images[0].name}` : null,
      imagem2: images[1] ? `${imagesUrl}${images[1].name}` : null,
      imagem3: images[2] ? `${imagesUrl}${images[2].name}` : null,
      imagem4: images[3] ? `${imagesUrl}${images[3].name}` : null,
      imagem5: images[4] ? `${imagesUrl}${images[4].name}` : null,
    });
    if (error) {
      return false;
    }
    return true;
  };

  const insertNewProduct = async () => {
    saveLocalStorage();
    try {
      const { data, error } = await supabase
        .from('produtos')
        .insert({
          marca: posting.data.model,
          titulo: posting.title,
          categoria: posting.data.brand,
          modelo: posting.data.model,
          preco: posting.data.price,
          quantidade: posting.data.quantity,
          id_usuario: sessionUser.id,
        })
        .select();
      if (error) {
        throw new Error(error.message);
      }
      const insertSpecsResult = await insertSpecs(data[0].id, posting.specs);
      if (!insertSpecsResult) {
        throw new Error('Erro ao iserir especificações do produto');
      }
      const uploadsImagesResult = await uploadProductImages(
        data[0].id,
        posting.cover,
        posting.images
      );
      if (!uploadsImagesResult) {
        throw new Error('Erro ao fazer upload das imagens do anúncio');
      }
      const insertImagesResult = await insertProdutcImages(
        data[0].id,
        posting.cover,
        posting.images
      );
      if (!insertImagesResult) {
        throw new Error('Erro ao salvar imagens na base de dados');
      }
      const toast = {
        id: 'insert-product-success',
        type: 'success',
        message: 'Anúncio cadastrado com sucesso',
      };
      setPostToast(toast);
      getUserPostings();
      deleteLocalStorage();
      return true;
    } catch (error) {
      showToast(
        'insert-product-error',
        'error',
        `Um erro ocorreu ao cadastrar seu anúncio! tente novamente`
      );
      deleteLocalStorage();
      return false;
    }
  };

  const updatePostData = async (values) => {
    saveLocalStorage();
    try {
      const { error } = await supabase
        .from('produtos')
        .update(values)
        .eq('id_usuario', sessionUser.id);
      if (error) {
        throw new Error(error.message);
      }
      const toast = {
        id: 'update-product-data-success',
        type: 'success',
        message: 'Dados do anúncio alterados alterados com sucesso',
      };
      setPostToast(toast);
      getUserPostings();
      deleteLocalStorage();
      return true;
    } catch (error) {
      showToast(
        'update-product-data-error',
        'error',
        'Um erro ocorreu ao atualizar seu anúncio! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const updatePostSpecs = async (values, productId) => {
    saveLocalStorage();
    try {
      const { error } = await supabase
        .from('produto_informacoes')
        .delete()
        .eq('produto_id', productId);
      if (error) {
        throw new Error(error.message);
      }
      const result = await insertSpecs(productId, values);
      if (!result) {
        throw new Error();
      }
      const toast = {
        id: 'update-product-specs-success',
        type: 'success',
        message: 'Informações do anúncio alteradas alterados com sucesso',
      };
      setPostToast(toast);
      getUserPostings();
      deleteLocalStorage();
      return true;
    } catch (error) {
      showToast(
        'update-product-specs-error',
        'error',
        'Um erro ocorreu ao atualizar seu anúncio! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const deleteImage = async (folder, fileName) => {
    await supabase.storage.from('produtos').remove([`${folder}/${fileName}`]);
  };

  const updatePostImages = async (values, productId) => {
    const { error } = await supabase
      .from('produto_imagens')
      .update(values)
      .eq('id_produto', productId)
      .select();
    if (error) {
      return false;
    }
    return true;
  };

  const updatePostCover = async (file, coverUrl, productId) => {
    saveLocalStorage();
    const splitedUrl = coverUrl.split('/');
    const oldFileName = splitedUrl[splitedUrl.length - 1];
    try {
      await deleteImage(`${sessionUser.id}/${productId}`, oldFileName);
      const { error } = await supabase.storage
        .from('produtos')
        .upload(`${sessionUser.id}/${productId}/capa-${file.name}`, file, {
          cacheControl: '3600',
          upsert: true,
        });
      const baseUrl = `https://apovoiknbwujzmlwpvzo.supabase.co/storage/v1/object/public/produtos/`;
      const imageUrl = `${baseUrl}${sessionUser.id}/${productId}/capa-${file.name}`;
      const updateResult = await updatePostImages(
        { capa: imageUrl },
        productId
      );
      if (!updateResult) {
        throw new Error();
      }
      if (error) {
        throw new Error(error.message);
      }
      const toast = {
        id: 'update-product-cover-success',
        type: 'success',
        message: 'Capa do anúncio alterada com sucesso',
      };
      setPostToast(toast);
      deleteLocalStorage();
      getUserPostings();
      return true;
    } catch (error) {
      showToast(
        'update-product-cover-error',
        'error',
        'Um erro ocorreu ao atualizar a capa do anúncio! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const updatePostImage = async (file, data, productId) => {
    saveLocalStorage();
    const key = Object.keys(data);
    const imageX = key[0];
    const imageUrl = data[imageX];
    const splitedUrl = imageUrl.split('/');
    const oldFileName = splitedUrl[splitedUrl.length - 1];
    try {
      await deleteImage(`${sessionUser.id}/${productId}`, oldFileName);
      const { error } = await supabase.storage
        .from('produtos')
        .upload(`${sessionUser.id}/${productId}/${imageX}-${file.name}`, file, {
          cacheControl: '3600',
          upsert: true,
        });
      if (error) {
        throw new Error(error.message);
      }
      const baseUrl = `https://apovoiknbwujzmlwpvzo.supabase.co/storage/v1/object/public/produtos/`;
      const newUrl = `${baseUrl}${sessionUser.id}/${productId}/${imageX}-${file.name}`;
      const newData = { [imageX]: newUrl };
      const updateResult = await updatePostImages(newData, productId);
      if (!updateResult) {
        throw new Error();
      }
      const toast = {
        id: 'update-product-image-success',
        type: 'success',
        message: 'Imagem do anúncio alterada com sucesso',
      };
      deleteLocalStorage();
      setPostToast(toast);
      getUserPostings();
      return true;
    } catch (error) {
      showToast(
        'update-product-image-error',
        'error',
        'Um erro ocorreu ao atualizar a imagem! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const uploadPostImage = async (file, data, productId) => {
    saveLocalStorage();
    try {
      if (data === null) {
        const { error } = await supabase.storage
          .from('produtos')
          .upload(`${sessionUser.id}/${productId}/imagem1-${file.name}`, file, {
            upsert: true,
          });
        if (error) {
          throw new Error(error);
        }
        const baseUrl = `https://apovoiknbwujzmlwpvzo.supabase.co/storage/v1/object/public/produtos/`;
        const imageUrl = `${baseUrl}${sessionUser.id}/${productId}/imagem1-${file.name}`;
        const updateResult = await updatePostImages(
          { imagem1: imageUrl },
          productId
        );
        if (!updateResult) {
          throw new Error();
        }
      } else {
        let nextImagePosition = 1;
        for (const item of data) {
          if (item[`imagem${nextImagePosition}`] === null) {
            break;
          }
          nextImagePosition += 1;
        }
        const { error } = await supabase.storage
          .from('produtos')
          .upload(
            `${sessionUser.id}/${productId}/imagem${nextImagePosition}-${file.name}`,
            file,
            {
              upsert: true,
            }
          );
        if (error) {
          throw new Error(error);
        }
        const baseUrl = `https://apovoiknbwujzmlwpvzo.supabase.co/storage/v1/object/public/produtos/`;
        const imageUrl = `${baseUrl}${sessionUser.id}/${productId}/imagem${nextImagePosition}-${file.name}`;
        const newData = {};
        newData[`imagem${nextImagePosition}`] = imageUrl;
        const updateResult = await updatePostImages(newData, productId);
        if (!updateResult) {
          throw new Error();
        }
      }
      const toast = {
        id: 'upload-product-image-success',
        type: 'success',
        message: 'Imagem adicionada com sucesso',
      };
      setPostToast(toast);
      getUserPostings();
      deleteLocalStorage();
      return true;
    } catch (error) {
      showToast(
        'upload-product-image-error',
        'error',
        'Um erro ocorreu ao fazer o upload de sua imagem! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const deletePostImage = async (value, imageUrl, productId) => {
    saveLocalStorage();
    const splitedUrl = imageUrl.split('/');
    const fileName = splitedUrl[splitedUrl.length - 1];
    try {
      await deleteImage(`${sessionUser.id}/${productId}`, fileName);
      const updateResult = await updatePostImages(value, productId);
      if (!updateResult) {
        throw new Error();
      }
      const toast = {
        id: 'delete-product-image-success',
        type: 'success',
        message: 'Imagem excluída com sucesso',
      };
      setPostToast(toast);
      getUserPostings();
      deleteLocalStorage();
      return true;
    } catch (error) {
      showToast(
        'delete-product-image-error',
        'error',
        'Um erro ocorreu ao excluir sua imagem! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const getAllImages = async (path) => {
    const { data, error } = await supabase.storage.from('produtos').list(path);
    if (error) {
      return false;
    }
    return data;
  };

  const deletePost = async (productId) => {
    saveLocalStorage();
    try {
      const path = `${sessionUser.id}/${productId}`;
      const allImages = await getAllImages(path);
      if (allImages) {
        for (const image of allImages) {
          await deleteImage(path, image.name);
        }
        const { error } = await supabase
          .from('produtos')
          .delete()
          .eq('id', productId);
        if (error) {
          throw new Error(error);
        }
        const toast = {
          id: 'delete-post-success',
          type: 'success',
          message: 'Anúncio excluído com sucesso',
        };
        deleteLocalStorage();
        getUserPostings();
        setPostToast(toast);
        navigate('seus-anuncios');
        return true;
      }
      throw new Error();
    } catch (error) {
      showToast(
        'delete-post-error',
        'error',
        'Um erro ocorreu ao excluir seu anúncio! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const getPost = async (id) => {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*, produto_imagens(*), produto_informacoes(*)')
        .eq('id', id);
      if (error) {
        throw new Error(error);
      }
      return data;
    } catch (error) {
      return false;
    }
  };

  const getSeller = async (id) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('nome, imagem, media_avaliacoes, total_avaliacoes')
        .eq('id', id);
      if (error) {
        throw new Error(error);
      }
      return data;
    } catch (error) {
      return false;
    }
  };

  const getProductsCartItens = async () => {
    setLoading(true);
    saveLocalStorage();
    try {
      const { data, error } = await supabase
        .from('carrinho_de_compras')
        .select('*')
        .eq('id_usuario', sessionUser.id);
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        setUserCartItens(data.length > 0 ? data : null);
        const arrayOfIds = data.map((item) => item.id_produto);
        setUserCartItensIds(arrayOfIds);
        let userItens = 0;
        let totalPrice = 0;
        data.forEach((iten) => {
          if (iten.quantidade_total !== null) {
            const subtotal = iten.preco_unitario * iten.quantidade_usuario;
            totalPrice += subtotal;
            userItens += iten.quantidade_usuario;
          }
        });
        totalPrice = parseFloat(totalPrice.toFixed(2));
        let totalPriceString = totalPrice.toFixed(2);
        if (totalPrice === parseInt(totalPrice, 10)) {
          totalPriceString = `${totalPrice.toFixed(0)}.00`;
        }
        setCartTotalPrice(totalPriceString);
        setCartTotalItens(userItens);
      } else {
        setUserCartItens(null);
      }
      setLoading(false);
      deleteLocalStorage();
    } catch (error) {
      setUserCartItens(null);
      setLoading(false);
      deleteLocalStorage();
    }
  };

  const addProductToCart = async (productId) => {
    saveLocalStorage();
    try {
      const product = await getPost(productId);
      const cleanPriceString = product[0].preco
        .replace(/(R|\$|\s|\.)/g, '')
        .replace(',', '.');
      const priceFloat = parseFloat(cleanPriceString);
      const itenCart = {
        id_usuario: sessionUser.id,
        id_produto: productId,
        id_vemdedor: product[0].id_usuario,
        quantidade_total: product[0].quantidade,
        preco_unitario: priceFloat,
        titulo: product[0].titulo,
        imagem: product[0].produto_imagens[0].capa,
      };
      const { error } = await supabase
        .from('carrinho_de_compras')
        .insert(itenCart);
      if (error) {
        throw new Error(error.message);
      }
      const toast = {
        id: 'add-product-to-cart-success',
        type: 'success',
        message: 'Produto adicionado no seu carrinho',
      };
      setPostToast(toast);
      getProductsCartItens();
      navigate('/carrinho-de-compras');
      deleteLocalStorage();
      return true;
    } catch (error) {
      showToast(
        'add-product-to-cart-error',
        'error',
        'Um erro ocorreu ao adicionar o produto no seu carrinho! Tente novamente'
      );
      deleteLocalStorage();
      return false;
    }
  };

  const updateCartIten = async (productId, iten) => {
    try {
      saveLocalStorage();
      const { error } = await supabase
        .from('carrinho_de_compras')
        .update(iten)
        .eq('id_produto', productId);
      deleteLocalStorage();
      if (error) {
        throw new Error(error.message);
      } else {
        await getProductsCartItens();
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteCartIten = async (productId) => {
    try {
      saveLocalStorage();
      const { error } = await supabase
        .from('carrinho_de_compras')
        .delete()
        .eq('id_produto', productId);
      deleteLocalStorage();
      if (error) {
        throw new Error(error.message);
      } else {
        await getProductsCartItens();
        return true;
      }
    } catch (error) {
      showToast(
        `delete-cart-iten-error-${productId}`,
        'error',
        'Um erro ocorreu ao remover o produto do seu carrinho! Tente novamente'
      );
      return false;
    }
  };

  const deleteAllCartItens = async () => {
    try {
      saveLocalStorage();
      const { error } = await supabase
        .from('carrinho_de_compras')
        .delete()
        .eq('id_usuario', sessionUser.id);
      deleteLocalStorage();
      if (error) {
        throw new Error(error.message);
      } else {
        await getProductsCartItens();
        const toast = {
          id: 'delete-all-cart-itens-success',
          type: 'success',
          message: 'Produtos removidos do carrinho com sucesso',
        };
        setPostToast(toast);
        return true;
      }
    } catch (error) {
      const toast = {
        id: `delete-all-cart-itens-error`,
        type: 'error',
        message:
          'Um erro ocorreu ao remover os produtos do seu carrinho! Tente novamente',
      };
      setPostToast(toast);
      return false;
    }
  };

  const finalizeOrder = async (cartItens) => {
    // eslint-disable-next-line no-console
    console.log(cartItens);
  };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      if (sessionUser) {
        saveLocalStorage();
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*), produto_informacoes(*)')
          .neq('id_usuario', sessionUser.id);
        deleteLocalStorage();
        if (error) {
          throw new Error(error.message);
        } else {
          if (data.length > 0) {
            setAllproducts(data);
          } else {
            setAllproducts(null);
          }
          setLoading(false);
          return true;
        }
      } else {
        saveLocalStorage();
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*), produto_informacoes(*)');
        deleteLocalStorage();
        if (error) {
          throw new Error(error.message);
        } else {
          if (data.length > 0) {
            setAllproducts(data);
          } else {
            setAllproducts(null);
          }
          setLoading(false);
          return true;
        }
      }
    } catch (error) {
      const toast = {
        id: `delete-all-cart-itens-error`,
        type: 'error',
        message:
          'Um erro ocorreu ao remover os produtos do seu carrinho! Tente novamente',
      };
      setPostToast(toast);
      setLoading(false);
      return false;
    }
  };

  const getProductsByModel = async (search) => {
    try {
      setTextSearch(search);
      if (sessionUser) {
        saveLocalStorage();
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*), produto_informacoes(*)')
          .or(
            `titulo.ilike.%${search}%`,
            `modelo.ilike.%${search}%`,
            `marca.ilike.%${search}%`
          )
          .neq('id_usuario', sessionUser.id);
        deleteLocalStorage();
        if (error) {
          throw new Error(error.message);
        } else {
          if (data.length > 0) {
            setProductsSearch(data);
          } else {
            setProductsSearch(null);
          }
          navigate('busca-avancada');
          return true;
        }
      } else {
        saveLocalStorage();
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*), produto_informacoes(*)')
          .or(
            `titulo.ilike.%${search}%`,
            `modelo.ilike.%${search}%`,
            `marca.ilike.%${search}%`
          );
        deleteLocalStorage();
        if (error) {
          throw new Error(error.message);
        } else {
          if (data.length > 0) {
            setProductsSearch(data);
          } else {
            setProductsSearch(null);
          }
          navigate('busca-avancada');
          return true;
        }
      }
    } catch (error) {
      const toast = {
        id: `delete-all-cart-itens-error`,
        type: 'error',
        message:
          'Um erro ocorreu ao remover os produtos do seu carrinho! Tente novamente',
      };
      setPostToast(toast);
      return false;
    }
  };

  const getLastProducts = async () => {
    setLoading(true);
    try {
      if (sessionUser) {
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*)')
          .neq('id_usuario', sessionUser.id)
          .order('created_at', { ascending: false })
          .limit(10);
        if (error) {
          throw new Error(error);
        }
        setLastproducts(error ? null : data);
      } else {
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*)')
          .order('created_at', { ascending: false })
          .limit(10);
        if (error) {
          throw new Error(error);
        }
        setLastproducts(error ? null : data);
      }
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getLastProducts();
    getUserPostings();
    getAllProducts();
    if (sessionUser) {
      getProductsCartItens();
    }
  }, [sessionUser]);

  const productContextValue = {
    lastProducts,
    posting,
    userPostings,
    userCartItens,
    userCartItensIds,
    cartTotalPrice,
    cartTotalItens,
    productsSearch,
    allProducts,
    textSearch,
    setTextSearch,
    setProductsSearch,
    insertNewProduct,
    getUserPost,
    updatePostData,
    updatePostSpecs,
    updatePostCover,
    uploadPostImage,
    updatePostImage,
    deletePostImage,
    deletePost,
    addProductToCart,
    updateCartIten,
    deleteCartIten,
    deleteAllCartItens,
    finalizeOrder,
    getProductsByModel,
    getAllProducts,
    getPost,
    getSeller,
    postToast,
    setPostToast,
  };

  return (
    <ProductContext.Provider value={productContextValue}>
      {loading ? <PreLoader /> : children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
