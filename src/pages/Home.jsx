import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';

function Home() {
  const dispatch = useDispatch();
  const { products, status: productStatus } = useSelector((state) => state.products);
  const { categories, status: categoryStatus } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 3 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to E-Shop</h1>
        <p>Discover the best products at unbeatable prices!</p>
        <Link to="/products" className="btn">Shop Now</Link>
      </div>
      <h2>Categories</h2>
      <div className="category-filter">
        {categoryStatus === 'loading' ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`} className="btn">
              {category.name}
            </Link>
          ))
        )}
      </div>
      <h2>Featured Products</h2>
      {productStatus === 'loading' ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;