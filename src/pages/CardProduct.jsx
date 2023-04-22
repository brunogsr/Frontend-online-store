import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  addProductInCart = () => {
    // TESTE DE SALVAR O PRODUTO NO CARRINHO
    // ARRAY DE PRODUTOS DO CARRINHO SE CHAMARÁ: arrayProductsCart
    const { productDetails } = this.state;
    const arrayProductsCart = JSON.parse(localStorage.getItem('arrayProductsCart')) || [];
    let product = arrayProductsCart.find(({ id }) => id === productDetails.id);
    if (product) {
      product.quantidade += 1;
    } else {
      product = productDetails;
      product.quantidade = 1;
      arrayProductsCart.push(product);
    }
    localStorage.setItem('arrayProductsCart', JSON.stringify(arrayProductsCart));
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

        <button
          data-testid="product-detail-add-to-cart"
          onClick={ this.addProductInCart }
        >
          Adicionar o Carrinho

        </button>

        <Link to="/cart" data-testid="shopping-cart-button">
          <button>Ir Para o Carrinho</button>
        </Link>
      </div>
    );
  }
}

CardProduct.propTypes = {
  id: PropTypes.string,
}.isRequired;
