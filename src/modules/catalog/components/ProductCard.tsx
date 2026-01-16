import { memo } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <article className="product-card">
      <div className="product-card-image">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          loading="lazy"
        />
        {hasDiscount && (
          <span className="product-card-badge">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-brand">{product.brand}</p>
        <div className="product-card-rating">
          <span className="product-card-stars">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
          </span>
          <span className="product-card-rating-value">{product.rating.toFixed(1)}</span>
        </div>
        <div className="product-card-pricing">
          {hasDiscount && (
            <span className="product-card-original-price">${product.price.toFixed(2)}</span>
          )}
          <span className="product-card-price">${discountedPrice.toFixed(2)}</span>
        </div>
        <div className="product-card-stock">
          {product.stock > 10 ? (
            <span className="stock-available">In Stock</span>
          ) : product.stock > 0 ? (
            <span className="stock-low">Only {product.stock} left</span>
          ) : (
            <span className="stock-out">Out of Stock</span>
          )}
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
