import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route path='/review' element={<Review />} />
          <Route path='/inventory' element={<PrivateRoute><Inventory /></PrivateRoute>} />
          <Route path='/shipment' element={<PrivateRoute><Shipment /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Shop />} />
          <Route path='/product/:productKey' element={<ProductDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
