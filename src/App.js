
import './App.css';
import Header from './component/header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Langding from './component/langding/Langding';
import Product from './component/home/Product';
import Cart from './component/home/cart/Cart';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' component={Langding} exact />
          <Route path='/home' component={Product} />
          <Route path='/cart' component={Cart} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
