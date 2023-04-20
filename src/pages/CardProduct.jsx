import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class CardProduct extends Component {
  state = {
    productDetails: '',
  };

  componentDidMount() {
    this.handleId();
  }

  handleId = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const productDetails = await getProductById(id);
    this.setState({
      productDetails,
    });
  };

  render() {
    const { productDetails } = this.state;
    const { title, thumbnail, attributes = [], price } = productDetails;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">{ price }</p>
        {
          attributes.map(({ name, value_name: valueName }, index) => (
            <p key={ index }>
              { `${name}: ${valueName}`}
            </p>))
        }
      </div>
    );
  }
}

CardProduct.propTypes = {
  id: PropTypes.string,
}.isRequired;
