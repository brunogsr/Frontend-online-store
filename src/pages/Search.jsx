import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Search extends Component {
  state = {
    inputSearch: '',
    categoriesList: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const categoriesList = await getCategories(id);

    this.setState({
      categoriesList,
    });
  }

  onSearchButtonClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const {
      inputSearch,
      categoriesList,
    } = this.state;
    return (
      <div>
        <input
          name="inputSearch"
          value={ inputSearch }
          type="text"
        />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <button
          data-testid="shopping-cart-button"
          onClick={ this.onSearchButtonClick }
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
                  id="categoria"
                  type="radio"
                  { ...category }
                />
              </label>
            ))
          }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        push: PropTypes.func,
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};
