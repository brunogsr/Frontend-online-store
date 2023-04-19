import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    inputSearch: '',
  };

  onSearchButtonClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { inputSearch } = this.state;
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
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
