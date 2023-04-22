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

  render() {
    const { arrayProductsCart } = this.state;
    return (
      <div>
        { arrayProductsCart.length > 0
          ? (
            arrayProductsCart.map(({ title, quantidade }, index) => (
              <div key={ index }>
                <p data-testid="shopping-cart-product-name">{ title }</p>
                <br />
                <p data-testid="shopping-cart-product-quantity">
                  Quantidade:
                  { quantidade }
                </p>

              </div>))
          )
          : (
            <h1
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </h1>)}

      </div>
    );
  }
}

export default Cart;
