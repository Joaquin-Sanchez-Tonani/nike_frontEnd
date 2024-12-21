import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails({ products , setCart , cart}) {
    const [handleProduct, setHandleProduct] = useState(null); 
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1); 
      
    const handleChange = (event) => {
        setQuantity(event.target.value); 
    };
    useEffect(() => {
        const product = products.find((product) => product[0] === parseInt(id));
        setHandleProduct(product); 
    }, [id, products]); 

    if (!handleProduct) {
        return <p>Loading product details...</p>; 
    }

    const handleBuy = () =>{
        alert("El precio total pagado es: "+handleProduct[3] * quantity)
    }

    const addToCart = () => {
        const existingProduct = cart.find((item) => item.id === handleProduct[0]);
        
        const currentQuantityInCart = existingProduct ? existingProduct.quantity : 0; 
        const totalQuantity = currentQuantityInCart + parseInt(quantity);
    
        if (handleProduct[6] < totalQuantity) {
            alert("No hay suficiente stock");
            return;
        }
    
        let updatedCart;
    
        if (existingProduct) {
            updatedCart = cart.map((item) =>
                item.id === handleProduct[0]
                    ? { ...item, quantity: item.quantity + parseInt(quantity) }
                    : item
            );
        } else {
            const newItem = { 
                id: handleProduct[0], 
                name: handleProduct[1], 
                price: handleProduct[3], 
                quantity: parseInt(quantity) 
            };
            updatedCart = [...cart, newItem];
        }
    
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Producto agregado correctamente...");
    };
    

    return (
        <div className='productDetails'>
            <img className='productDetails_image' src={handleProduct[5]} alt={handleProduct[1]} />
            <div className='productDetails_div'>
                <h3>{handleProduct[1]}</h3>
                <p>{handleProduct[2]}</p>
                <h4>Precio: ${handleProduct[3]}</h4>
                <h4>Cantidad disponible: {handleProduct[6]}</h4>
                <input onChange={handleChange} step={1} value={quantity} min={1} max={handleProduct[6]} className='amount' type="number" />
                <div className='div_buy'>
                    <button onClick={handleBuy} type='submit' className='buy'>Comprar</button>
                    <button onClick={addToCart} type='submit' className='buy'>Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
