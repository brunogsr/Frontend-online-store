import React from 'react';

class Cart extends React.Component {
  state = {
    arrayProductsCart: [],
  };

  async componentDidMount() {
    const arrayProductsCart = JSON.parse(localStorage.getItem('arrayProductsCart')) || [];
    this.setState({
      arrayProductsCart,
    });
  }

  dispatchCartUpdateEvent = () => {
    const cartUpdateEvent = new Event('cartUpdate');
    window.dispatchEvent(cartUpdateEvent);
  };

  updateValue = (id, action) => {
    const DECREMENT = -1;
    const arrayProductsCart = JSON.parse(localStorage.getItem('arrayProductsCart')) || [];
    const product = arrayProductsCart.find((item) => item.id === id);

    if (product.quantidade >= 2 || action !== 'decrease') {
      product.quantidade += action === 'decrease' ? DECREMENT : 1;
      localStorage.setItem('arrayProductsCart', JSON.stringify(arrayProductsCart));
      this.setState({ arrayProductsCart });
      this.dispatchCartUpdateEvent();
    }
  };

  handleDeleteProduct = ({ target }) => {
    const { arrayProductsCart } = this.state;
    const newSavedProducts = arrayProductsCart.filter(({ id }) => id !== target.id);

    this.setState({
      arrayProductsCart: newSavedProducts,
    });
    localStorage.setItem('arrayProductsCart', JSON.stringify(newSavedProducts));
  };

  render() {
    const { arrayProductsCart } = this.state;
    return (
      <div>
        {!arrayProductsCart.length ? (
          <span
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </span>
        ) : (
          arrayProductsCart.map(({ id, title, img, price, quantidade }) => (
            <div
              key={ id }
              className="cart-product"
            >
              <img
                src={ img }
                alt={ title }
              />
              <span
                data-testid="shopping-cart-product-name"
              >
                {title}
              </span>
              <button
                onClick={ () => this.updateValue(id, 'decrease') }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                {quantidade}
              </p>
              <button
                onClick={ () => this.updateValue(id, 'increase') }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                className="button-cart"
                id={ id }
                onClick={ this.handleDeleteProduct }
                data-testid="remove-product"
              >
                Remover produto
              </button>
              <span>
                {price}
              </span>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Cart;
