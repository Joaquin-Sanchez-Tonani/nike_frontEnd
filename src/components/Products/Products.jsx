import { useEffect, useState } from 'react';
import './Products.css';
import { Link } from 'react-router-dom';

function Products({ isLoading , products, setProducts, category, searchValue, setCategory }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(12);

    useEffect(() => {
        setFilteredProducts(products.slice(0, itemsToShow));
    }, [products, itemsToShow]);

    useEffect(() => {
        setCategory(0);
        const filteredResults = products.filter((item) =>
            item[1].toLowerCase().includes(searchValue)
        );
        setFilteredProducts(filteredResults.slice(0, itemsToShow));
    }, [searchValue]);

    useEffect(() => {
        if (category === 0) {
            setFilteredProducts(products.slice(0, itemsToShow));
        } else {
            const filtered = products.filter((product) => product[4] === category);
            setFilteredProducts(filtered.slice(0, itemsToShow));
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
            {isLoading ? <div><div className='loader'></div></div> : filteredProducts.length > 0 ? (
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
