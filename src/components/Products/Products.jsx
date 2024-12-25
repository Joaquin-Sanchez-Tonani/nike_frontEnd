import { useEffect, useState } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';

function Products({ products, setProducts, category, searchValue, setCategory }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(12);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setFilteredProducts(products.slice(0, itemsToShow));
            setIsLoading(false);
        }, 500);
    }, [products, itemsToShow]);

    useEffect(() => {
        setCategory(0);
        setIsLoading(true);
        const filteredResults = products.filter((item) =>
            item[1].toLowerCase().includes(searchValue)
        );
        setTimeout(() => {
            setFilteredProducts(filteredResults.slice(0, itemsToShow));
            setIsLoading(false);
        }, 300);
    }, [searchValue]);

    useEffect(() => {
        setIsLoading(true);
        if (category === 0) {
            setTimeout(() => {
                setFilteredProducts(products.slice(0, itemsToShow));
                setIsLoading(false);
            }, 300);
        } else {
            const filtered = products.filter((product) => product[4] === category);
            setTimeout(() => {
                setFilteredProducts(filtered.slice(0, itemsToShow));
                setIsLoading(false);
            }, 300);
        }
    }, [category, products]);

    const handleScroll = () => {
        const bottom =
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 300;

        if (bottom) {
            setItemsToShow((prev) => prev + 12);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="products_content">
            {isLoading ? (
                <div className='loader'/>// Aquí puedes usar un spinner o un componente de carga
            ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <Link to={`/product/${product[0]}`} key={product[0]}>
                        <article className="product_article">
                            <div className="focus">
                                <img
                                    loading="lazy"
                                    className="product_image"
                                    src={product[5]}
                                    alt={product[1]}
                                />
                            </div>
                            <div className="product_div">
                                <h4 className="product_name">{product[1]}</h4>
                                <h4 className="product_stock">Stock: {product[6]}</h4>
                            </div>
                            <p className="product_description">{product[2]}</p>
                            <h4 className="product_price">${product[3]}</h4>
                        </article>
                    </Link>
                ))
            ) : (
                <p>No products available for this category.</p>
            )}
        </section>
    );
}

export default Products;
