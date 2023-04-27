import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";


function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route path='/review' element={<Review />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/' element={<Shop />} />
          <Route path='/product/:productKey' element={<ProductDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
