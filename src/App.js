
import './App.css';
import Header from './component/header/Header';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import Langding from './component/langding/Langding';
import Product from './component/home/Product';
import Cart from './component/home/cart/Cart';
import SingleProduct from './component/product/NewSingleProduct';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import { GlobalContext } from './GlobalContext';
import { useContext, useEffect, useState } from 'react';
import Profile from './component/auth/Profile';
import MyAccount from './component/auth/MyAccount';
import Payment from './component/payment/Payment';
import ModalAuth from './component/auth/ModalAuth'
import 'animate.css';
import SellerRegister from './component/auth/SellerRegister';
function App() {
  const context = useContext(GlobalContext)
  const [isLogin] = context.isLoggin

  const [isShowModalLoggin, setIsShowModalLoggin] = useState(false)
  const seller = true

  return (
    <Router>
      <div className="App">
        <Header setIsShow={setIsShowModalLoggin} />
        <Switch>
          <Route path='/home' component={Product} exact />
          <Route path='/' component={Product} exact />
          <Route path='/cart' component={Cart} />
          <Route path='/detail/:id' component={SingleProduct} />
          <Route path='/register-seller' component={SellerRegister} />
          {/* <Route path='/login' component={isLogin ? Product : Login} />
          <Route path='/register' component={isLogin ? Product : Register} /> */}
          <Route path='/payment' component={isLogin ? Payment : Register} />
          <Route
            exact
            path='/profile'
            render={props => isLogin ? <Profile {...props} optionRoute='myaccount' /> : <Register />}
          />
          <Route
            exact
            path='/oders'
            render={props => isLogin ? <Profile {...props} optionRoute='oders' /> : <Register />}
          />
          <Route
            exact
            path='/my-shop'
            render={props => isLogin ? <Profile {...props} optionRoute='myshop' /> : <Register />}
          />
          <Route
            exact
            path='/add-product'
            render={props => isLogin ? <Profile {...props} optionRoute='addproduct' /> : <Register />}
          />
        </Switch>
        <div className='footer'>
        </div>
        {
          isShowModalLoggin && <ModalAuth setIsShow={setIsShowModalLoggin} />
        }
      </div>

    </Router>

  );
}

export default App;
