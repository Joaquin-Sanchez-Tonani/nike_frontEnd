import { useState } from 'react';
import './Header.css';

function Header({ cart, setCart, setSearchValue }) {
    const [activeCart, setActiveCart] = useState(false);

    const handleChange = (event) => {
        setSearchValue(event.target.value.toLowerCase());
    };

    const handleCart = () => {
        setActiveCart(!activeCart);
    };

    const clearStorage = () => {
        localStorage.clear();
        setCart([]);
    };

    const totalToPay = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <header>
            <a href="/"><img className='logo' src="/logo.png" alt="logo" /></a>
            
            <form  className="search-form">
                <button className='search' type="text">
                    <i className="flaticon fi fi-rr-search"></i>
                </button>
                <input 
                    onChange={handleChange} 
                    className='search_input' 
                    type="text" 
                    name="query" 
                    placeholder="Buscar..." 
                />
            </form>
            
            <button className='buttons_cart' onClick={handleCart}><i className="flaticon fi fi-ss-cart-shopping-fast"></i></button>
            
            <section className={activeCart ? 'cart_active' : 'close'}>
                    <div>
                        <button className='close_button' onClick={clearStorage}><i className="flaticon fi fi-ss-cart-minus"></i></button>
                        <button className='close_button' onClick={handleCart}><i className="flaticon fi fi-br-cross"></i></button>
                    </div>
                {localStorage.length !== 0 ? (<>
                    <ul>
                        <li className="column">Nombre</li>
                        <li className="column">Cantidad</li>
                        <li className="column">Precio</li>
                    </ul>
                
                    {activeCart ? (
                        cart.map((c, key) => (
                            <article key={key}>
                                <ul>
                                    <li>{c.name}</li>
                                    <li>{c.quantity}</li>
                                    <li>${c.price}</li>
                                </ul>
                            </article>
                        ))
                    ) : null}

                    <h3 className='total'>Total a pagar: <span>${totalToPay.toFixed(2)}</span></h3></>)
                    : <h3 className='total'>No hay productos seleccionados</h3>
                }
            </section>
        </header>
    );
}

export default Header;
