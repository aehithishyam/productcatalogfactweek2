import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

const AddProductModal = ({ isOpen, onClose, onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('0');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('10');
  const [discount, setDiscount] = useState('0');
  const [thumbnail, setThumbnail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newProduct: Product = {
      id: Date.now(),
      title,
      price: Number(price),
      description,
      discountPercentage: Number(discount),
      rating: Number(rating),
      stock: Number(stock),
      brand,
      category,
      thumbnail: thumbnail || 'https://via.placeholder.com/300',
      images: [],
    };

    onAdd(newProduct);
    onClose();

    // reset form
    setTitle('');
    setPrice('');
    setRating('0');
    setDescription('');
    setBrand('');
    setCategory('');
    setStock('10');
    setDiscount('0');
    setThumbnail('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h3 className="modal-title">Add Product</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body form-grid">

          <div>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Product title"
            />
          </div>

          <div>
            <label className="form-label">Price</label>
            <input
              className="form-input"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="form-label">Brand</label>
            <input
              className="form-input"
              value={brand}
              onChange={e => setBrand(e.target.value)}
              placeholder="Brand name"
            />
          </div>

          <div>
            <label className="form-label">Category</label>
            <input
              className="form-input"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Category"
            />
          </div>

          <div>
            <label className="form-label">Stock</label>
            <input
              className="form-input"
              type="number"
              value={stock}
              onChange={e => setStock(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Discount %</label>
            <input
              className="form-input"
              type="number"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Rating (0 – 5)</label>
            <input
              className="form-input"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={e => setRating(e.target.value)}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Product description"
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Thumbnail URL</label>
            <input
              className="form-input"
              value={thumbnail}
              onChange={e => setThumbnail(e.target.value)}
              placeholder="https://..."
            />
          </div>

        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add Product
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductModal;

