import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Cart from './pages/Cart';
import Search from './pages/Search';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Search } />
        <Route exact path="/cart" component={ Cart } />
      </Switch>
    </main>
  );
}

export default App;
