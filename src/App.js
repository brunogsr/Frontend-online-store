import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Cart from './pages/Cart';
import Search from './pages/Search';
import CardProduct from './pages/CardProduct';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Search } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/cardproduct/:id" component={ CardProduct } />
      </Switch>
    </main>
  );
}

export default App;
