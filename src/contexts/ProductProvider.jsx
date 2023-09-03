import { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import PreLoader from '../components/PreLoader';

import { SupabaseContext } from './SupabaseProvider';
import { AuthContext } from './AuthProvider';

import showToast from '../utils/showToasts';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [lastProducts, setLastproducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { supabase } = useContext(SupabaseContext);
  const { sessionUser, saveLocalStorage, deleteLocalStorage } =
    useContext(AuthContext);
  const posting = {};

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
      showToast(
        'insert-product-success',
        'success',
        `Anúncio cadastrado com sucesso`
      );
    } catch (error) {
      showToast(
        'insert-product-error',
        'error',
        `Um erro ocorreu ao cadastrar seu anúncio! tente novamente`
      );
    }
    deleteLocalStorage();
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
        setLastproducts(error ? null : data);
        if (error) {
          throw new Error(error);
        }
      } else {
        const { data, error } = await supabase
          .from('produtos')
          .select('*, produto_imagens(*)')
          .order('created_at', { ascending: false })
          .limit(10);
        setLastproducts(error ? null : data);
        if (error) {
          throw new Error(error);
        }
      }
    } catch (error) {
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getLastProducts();
  }, [sessionUser]);

  const productContextValue = { insertNewProduct, lastProducts, posting };

  return (
    <ProductContext.Provider value={productContextValue}>
      {loading ? <PreLoader /> : children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
