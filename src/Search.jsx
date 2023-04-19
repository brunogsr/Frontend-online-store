import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    inputSearch: '',
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
      </div>
    );
  }
}
