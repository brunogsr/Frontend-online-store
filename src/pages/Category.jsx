import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Category extends Component {
  state = {
    categoriesList: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const categoriesList = await getCategories(id);

    this.setState({
      categoriesList,
    });
  }

  render() {
    const {
      categoriesList,
    } = this.state;
    return (
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
    );
  }
}

Category.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
