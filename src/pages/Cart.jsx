import React from 'react';

class Cart extends React.Component {
  state = {
    productName: '',
    productQuantidade: '',
  };

  async componentDidMount() {
    const arrayProductsCart = JSON.parse(localStorage.getItem('arrayProductsCart')) || [];
    this.setState({
      productName: arrayProductsCart[0].title,
      productQuantidade: arrayProductsCart[0].quantidade,
    });
  }

  render() {
    const { productName, productQuantidade } = this.state;
    return (
      <div>
        { productQuantidade > 0
          ? (
            <div>
              <p data-testid="shopping-cart-product-name">{ productName }</p>
              <br />
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                { productQuantidade }
              </p>

            </div>)
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
