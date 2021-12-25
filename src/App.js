
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
import SwipperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import SearchProduct from './component/home/searchPage'
import SellerRegister from './component/auth/SellerRegister';
import LoadingPage from './component/view/LoadingPage';
import Store from './component/store/Store';
import Footer from './component/Footer';
function App() {
  const context = useContext(GlobalContext)
  const [isLogin] = context.isLoggin
  const [isLoading] = context.productsApi.isLoading

  const [isShowModalLoggin, setIsShowModalLoggin] = useState(false)
  const seller = true

  SwipperCore.use([Autoplay])


  return (
    <Router>
      {
        isLoading ? <LoadingPage />
          :
          <div className="App position-relative">
            {
              isShowModalLoggin && <ModalAuth setIsShow={setIsShowModalLoggin} />
            }
            <Header setIsShow={setIsShowModalLoggin} />
            <Switch>
              <Route path='/home' component={Product} exact />
              <Route path='/search' component={SearchProduct} exact />
              <Route path='/' component={Product} exact />
              <Route path='/cart' component={Cart} />
              <Route path='/detail/:id' component={SingleProduct} exact />
              <Route path='/store/:id' component={Store} />
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
                path='/history'
                render={props => isLogin ? <Profile {...props} optionRoute='history' /> : <Register />}
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

            <Footer />
          </div>
      }
    </Router>

  )
}


export default App;
