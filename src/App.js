
import './App.css';
import Header from './component/header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Langding from './component/langding/Langding';
import Product from './component/home/Product';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' component={Langding} exact />
          <Route path='/home' component={Product} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
