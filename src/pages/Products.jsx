import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productSlice";
import { fetchCategories } from "../redux/slices/categorySlice";

function Products() {
  const [page, setPage] = useState(0);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const dispatch = useDispatch();
  const { products, totalPages, status, error } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts({ page, size: 6, categoryId }));
    dispatch(fetchCategories());
  }, [dispatch, page, categoryId]);

  return (
    <div className="container">
      <h2>All Products</h2>
      <div className="category-filter">
        <select
          onChange={(e) => {
            const value = e.target.value;
            window.location.href = value
              ? `/products?category=${value}`
              : "/products";
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
