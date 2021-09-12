
import './App.css';
import Header from './component/header/Header';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import Langding from './component/langding/Langding';
import Product from './component/home/Product';
import Cart from './component/home/cart/Cart';
import SingleProduct from './component/product/SingleProduct';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import { GlobalContext } from './GlobalContext';
import { useContext } from 'react';
function App() {
  const context = useContext(GlobalContext)
  const [isLogin] = context.isLoggin
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' component={Langding} exact />
          <Route path='/home' component={Product} exact />
          <Route path='/cart' component={Cart} />
          <Route path='/detail/:id' component={SingleProduct} />
          <Route path='/login' component={isLogin ? Product : Login} />
          <Route path='/register' component={isLogin ? Product : Register} />
        </Switch>
      </div>

    </Router>

  );
}

export default App;
