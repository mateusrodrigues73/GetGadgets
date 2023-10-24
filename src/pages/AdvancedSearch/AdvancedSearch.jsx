import { useState, useContext, useMemo } from 'react';

import {
  PageContainer,
  CenterContainer,
  FiltersContainer,
  FilterTitle,
  SearchInput,
  SelectorContainer,
  SelectedIten,
  DownIcon,
  UpIcon,
  ItensToSelectContainer,
  ItenToSelectWrapper,
  ItenToSelect,
  FilterSectionLine,
  ProductsContainer,
  NoProductsFindTitleContainer,
  NoProductsFindTitle,
} from './AdvancedSearch.styles';

import Breadcrumbs from '../../components/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle';
import GradientButton from '../../components/GradientButton';
import ProductCard from '../../components/ProductCard/ProductCard';
import PagesNav from '../../components/PagesNav';
import Loader from '../../components/Loader';

import showToast from '../../utils/showToasts';

import productCategories from '../../data/productCategories';

import { ProductContext } from '../../contexts/ProductProvider';

const AdvancedSearch = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [category, setCategory] = useState(null);
  const [showSortItens, setShowSortItens] = useState(false);
  const [sortIten, setSortIten] = useState('Menor valor');
  const [minPrice, setMinPrice] = useState('');
  const [minPriceFloat, setMinPriceFloat] = useState(null);
  const [maxPrice, setMaxPrice] = useState('');
  const [maxPriceFloat, setMaxPriceFloat] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const linksString = '/\\Home';
  const {
    textSearch,
    setTextSearch,
    productsSearch,
    setProductsSearch,
    allProducts,
    getProductsByModel,
  } = useContext(ProductContext);
  const [searchInput, setSearchInput] = useState(textSearch || '');
  const adsPerPage = 9;
  const [totalPages, setTotalPages] = useState(1);
  const sortItens = ['Menor valor', 'Maior Valor', 'Mais Recentes'];

  const choseCategory = (chosenCategory) => {
    setShowCategories(false);
    setCategory(chosenCategory);
  };

  const choseSortIten = (chosenSortIten) => {
    setShowSortItens(false);
    setSortIten(chosenSortIten);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const resetSearch = () => {
    setTextSearch(null);
    setSearchInput('');
    setMinPrice('');
    setMinPriceFloat(null);
    setMaxPrice('');
    setMaxPriceFloat(null);
    setProductsSearch(null);
    setCategory(null);
    setSortIten('Menor Valor');
    setNoResults(false);
  };

  const findProducts = async () => {
    if (!searchInput) {
      return;
    }
    setMinPrice('');
    setMinPriceFloat(null);
    setMaxPrice('');
    setMaxPriceFloat(null);
    setNoResults(false);
    setIsLoading(true);
    await getProductsByModel(searchInput);
    setIsLoading(false);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const priceStringToNumber = (priceString) => {
    const cleanPriceString = priceString.replace(/[^\d,]/g, '');
    const priceFloat = parseFloat(cleanPriceString.replace(',', '.'));
    return priceFloat;
  };

  const compareByPrice = (a, b) => {
    const priceA = priceStringToNumber(a.preco);
    const priceB = priceStringToNumber(b.preco);
    if (sortIten === 'Menor valor') {
      return priceA - priceB;
    }
    if (sortIten === 'Maior Valor') {
      return priceB - priceA;
    }
    return 0;
  };

  const compareByCreatedAt = (a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (sortIten === 'Mais Recentes') {
      return dateB - dateA;
    }
    return 0;
  };

  const renderProducts = () => {
    const startIndex = (currentPage - 1) * adsPerPage;
    const endIndex = startIndex + adsPerPage;
    let adsToRender;
    adsToRender = productsSearch || allProducts;
    adsToRender =
      adsToRender &&
      adsToRender.sort((a, b) => {
        const priceComparison = compareByPrice(a, b);
        if (priceComparison !== 0) {
          return priceComparison;
        }
        return compareByCreatedAt(a, b);
      });
    if (category) {
      adsToRender = adsToRender.filter((product) => {
        const { categoria } = product;
        return category === categoria;
      });
    }
    if (
      minPriceFloat &&
      maxPriceFloat &&
      typeof minPriceFloat === 'number' &&
      typeof maxPriceFloat === 'number'
    ) {
      adsToRender = adsToRender.filter((product) => {
        const priceFloat = priceStringToNumber(product.preco);
        return priceFloat >= minPriceFloat && priceFloat <= maxPriceFloat;
      });
    }
    setTotalPages(
      adsToRender ? Math.ceil(adsToRender.length / adsPerPage) : totalPages
    );
    adsToRender = adsToRender && adsToRender.slice(startIndex, endIndex);
    if (adsToRender && adsToRender.length < 1) {
      setNoResults(true);
      return null;
    }
    return (
      adsToRender &&
      adsToRender.map((product) => (
        <ProductCard
          key={product.id}
          title={product.titulo}
          image={product.produto_imagens[0].capa}
          price={product.preco}
          postId={product.id}
        />
      ))
    );
  };

  const aplyPriceFilter = () => {
    setNoResults(false);
    if (!minPrice || !maxPrice) {
      showToast(
        'price-filter-invalid-value-warn',
        'warn',
        'Insira valores válidos nos dois campos de preço'
      );
      return;
    }
    const min = priceStringToNumber(minPrice);
    const max = priceStringToNumber(maxPrice);
    if (min > max) {
      showToast(
        'min-price-bigger-than-max-price-warn',
        'warn',
        'Preço mínimo deve ser menor que preço máximo'
      );
      return;
    }
    setMinPriceFloat(min);
    setMaxPriceFloat(max);
  };

  const handleMinPriceChange = (event) => {
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
      setMinPrice(formattedValue === 'R$ 0,00' ? '' : formattedValue);
    }
  };

  const handleMaxPriceChange = (event) => {
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
      setMaxPrice(formattedValue === 'R$ 0,00' ? '' : formattedValue);
    }
  };

  const renderedProducts = useMemo(
    () => renderProducts(),
    [
      currentPage,
      adsPerPage,
      productsSearch,
      allProducts,
      minPriceFloat,
      maxPriceFloat,
      category,
      sortIten,
      noResults,
    ]
  );

  return (
    <>
      <Breadcrumbs linksString={linksString} actualPage="Busca avançada" />
      {textSearch ? (
        <SectionTitle title={`Você buscou por "${textSearch}"`} />
      ) : (
        <SectionTitle title="Página de busca" />
      )}
      <PageContainer>
        <CenterContainer>
          <FiltersContainer>
            <FilterTitle>Sua busca</FilterTitle>
            <SearchInput
              type="text"
              placeholder="Sua busca"
              value={searchInput}
              onChange={handleInputChange}
            />
            <GradientButton
              width="100%"
              height="25px"
              text="Buscar"
              onClick={findProducts}
            />
            <FilterSectionLine />
            <FilterTitle>Preço</FilterTitle>
            <SearchInput
              type="text"
              placeholder="Preço mínimo"
              onChange={handleMinPriceChange}
              value={minPrice}
            />
            <SearchInput
              type="text"
              placeholder="Preço máximo"
              onChange={handleMaxPriceChange}
              value={maxPrice}
            />
            <GradientButton
              width="100%"
              height="25px"
              text="Aplicar"
              onClick={aplyPriceFilter}
            />
            <FilterSectionLine />
            <FilterTitle>Ordenar por</FilterTitle>
            <SelectorContainer
              onMouseEnter={() => setShowSortItens(true)}
              onMouseLeave={() => setShowSortItens(false)}
            >
              <SelectedIten>{sortIten}</SelectedIten>
              {showSortItens ? <UpIcon /> : <DownIcon />}
              {showSortItens && (
                <ItensToSelectContainer top="-126px">
                  {sortItens.map((iten, index) => (
                    <ItenToSelectWrapper
                      key={index}
                      onClick={() => choseSortIten(iten)}
                    >
                      <ItenToSelect>{iten}</ItenToSelect>
                    </ItenToSelectWrapper>
                  ))}
                </ItensToSelectContainer>
              )}
            </SelectorContainer>
            <FilterSectionLine />
            <FilterTitle>Categoria</FilterTitle>
            <SelectorContainer
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <SelectedIten>{category || 'Escolha uma categoria'}</SelectedIten>
              {showCategories ? <UpIcon /> : <DownIcon />}
              {showCategories && (
                <ItensToSelectContainer top="-231px">
                  {productCategories.map((iten, index) => (
                    <ItenToSelectWrapper
                      key={index}
                      onClick={() => choseCategory(iten.categoria)}
                    >
                      <ItenToSelect>{iten.categoria}</ItenToSelect>
                    </ItenToSelectWrapper>
                  ))}
                </ItensToSelectContainer>
              )}
            </SelectorContainer>
            <FilterSectionLine />
            <GradientButton
              width="100%"
              height="25px"
              text="Resetar filtros"
              onClick={resetSearch}
            />
          </FiltersContainer>
          {(textSearch && !productsSearch) || noResults ? (
            <NoProductsFindTitleContainer>
              <NoProductsFindTitle>
                Nenhum resultado encontrado para sua busca
              </NoProductsFindTitle>
            </NoProductsFindTitleContainer>
          ) : (
            <ProductsContainer>{renderedProducts}</ProductsContainer>
          )}
        </CenterContainer>
        {(totalPages && totalPages > 1) ||
          (!noResults && (
            <PagesNav
              currentPage={currentPage}
              totalPages={totalPages}
              goPrevious={previousPage}
              goNext={nextPage}
            />
          ))}
      </PageContainer>
      {isLoading && <Loader />}
    </>
  );
};

export default AdvancedSearch;
