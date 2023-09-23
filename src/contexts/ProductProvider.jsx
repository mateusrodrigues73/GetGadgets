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
  const [userPostings, setUserPostings] = useState(null);
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
      setUserPostings(data.length > 0 ? data : null);
    } catch (error) {
      setUserPostings(null);
    }
    deleteLocalStorage();
    setLoading(false);
  };

  const getUserPost = (postingId) => {
    if (sessionUser) {
      if (userPostings && userPostings.length > 0) {
        const post = userPostings.find((p) => p.id === postingId);
        return post || null;
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
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getLastProducts();
    getUserPostings();
  }, [sessionUser]);

  const productContextValue = {
    lastProducts,
    posting,
    userPostings,
    insertNewProduct,
    getUserPost,
    updatePostData,
    updatePostSpecs,
    updatePostCover,
    uploadPostImage,
    updatePostImage,
    deletePostImage,
    deletePost,
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
