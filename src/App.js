import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Category from './pages/Category';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Search } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/category" component={ Category } />
      </Switch>
    </main>
  );
}

export default App;
