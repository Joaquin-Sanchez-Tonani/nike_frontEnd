import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importar los componentes necesarios
import { useState , useEffect} from 'react';
import Header from './components/Header/Header';
import Filter from './components/FilterMenu/Filter';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState([]);
  // localstorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const result = await fetch('https://python-backend-9d90.onrender.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            const data = await result.json();
            setProducts(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false); 
        }
    };

    fetchProducts();
}, []);

  return (
    <Router>
      <Header cart={cart} setCart={setCart} setSearchValue={setSearchValue} />
        <Routes>
          <Route exact path="/" element={
            <div className='body_class'>
              <Filter setCategory={setCategory} category={category} />
              <Products isLoading={isLoading} setProducts={setProducts} products={products} setCategory={setCategory} searchValue={searchValue} category={category} />
            </div>
          }/>
          <Route path="/product/:id" element={<ProductDetails cart={cart} setCart={setCart} products={products}/>}/>
        </Routes>
      
      <img className='banner' src="https://upload.snrcdn.net/182bc36876d08dadfd868786f82ce21a2596bd55/default/origin/2cd293d1bbb545b88dafca427c63e968.jpg" alt="" />
      <footer>
        <div>
          <h4>BUSCAR TIENDA</h4>
          <h4>SUMATE A LA COMUNIDAD</h4>
          <h4>SEGUÍ TU PEDIDO</h4>
        </div>
        <div>
          <h4>AYUDA</h4>
          <ul>
            <li>Envíos y entregas</li>
            <li>Devoluciones</li>
            <li>Cambios</li>
            <li>Autogestionar mi devolución</li>
            <li>Opciones de pago</li>
            <li>Contactate</li>
          </ul>
        </div>
      </footer>
    </Router>
  );
}

export default App;


