import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Detail from './pages/Detail';
import Login from './pages/Login';

import './styles/app.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/edit-product/:id' element={<AddProduct />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
