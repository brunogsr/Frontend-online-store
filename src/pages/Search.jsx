import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Search extends Component {
  state = {
    inputSearch: '',
    categoriesList: [],
    productsResults: [],
    categoryId: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const categoriesList = await getCategories(id);

    this.setState({
      categoriesList,
    });
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  // Funçã relacionada ao click do botão

  handleSearchClick = async () => {
    const { categoryId, inputSearch } = this.state;
    const getApi = await getProductsFromCategoryAndQuery(categoryId, inputSearch);
    this.setState({
      productsResults: getApi.results,
    });
  };

  // Modifiquei o nome dessa função para não confundir com o estado

  goToShoppingCart = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { productsResults } = this.state;
    const {
      inputSearch,
      categoriesList,
    } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          name="inputSearch"
          value={ inputSearch }
          type="text"
          onChange={ this.onChange }
        />
        <button
          data-testid="query-button"
          onClick={ this.handleSearchClick }

        >
          Pesquisar
        </button>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <button
          data-testid="shopping-cart-button"
          onClick={ this.goToShoppingCart }
        >
          Cart Button
        </button>
        <div>
          {
            categoriesList.map((category, index) => (
              <label
                htmlFor={ category.id }
                key={ index }
                data-testid="category"
              >
                { category.name }
                <input
                  id={ category.id }
                  type="radio"
                  name="categoryId"
                  value={ category.id }
                  onChange={ this.onChange }
                  onClick={ this.handleSearchClick }

                />
              </label>
            ))
          }
        </div>
        { productsResults.length === 0
          ? (<h3>Nenhum produto foi encontrado</h3>)
          : (
            <div>

              {productsResults.map((product, index) => (
                <div key={ index }>
                  <p data-testid="product">{ product.title }</p>
                  <p>{ product.price }</p>
                  <img src={ product.thumbnail } alt={ product.title } />
                </div>
              ))}
            </div>)}
      </div>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;
