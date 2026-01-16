import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

type FormState = {
  title: string;
  price: string;
  rating: string;
  description: string;
  brand: string;
  category: string;
  stock: string;
  discount: string;
  thumbnail: string;
};

const emptyForm: FormState = {
  title: '',
  price: '',
  rating: '',
  description: '',
  brand: '',
  category: '',
  stock: '',
  discount: '',
  thumbnail: '',
};

function createForm(product: Product): FormState {
  return {
    title: product.title,
    price: String(product.price),
    rating: String(product.rating),
    description: product.description || '',
    brand: product.brand || '',
    category: product.category || '',
    stock: String(product.stock),
    discount: String(product.discountPercentage),
    thumbnail: product.thumbnail || '',
  };
}

const EditProductModal = ({ isOpen, product, onClose, onSave }: Props) => {

  const [form, setForm] = useState<FormState>(() =>
    product ? createForm(product) : emptyForm
  );

  if (!isOpen || !product) return null;

  const update = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const updatedProduct: Product = {
      ...product,
      title: form.title,
      price: Number(form.price),
      rating: Number(form.rating),
      description: form.description,
      brand: form.brand,
      category: form.category,
      stock: Number(form.stock),
      discountPercentage: Number(form.discount),
      thumbnail: form.thumbnail,
    };

    onSave(updatedProduct);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h3 className="modal-title">Edit Product</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body form-grid">

          <Input label="Title" value={form.title} onChange={v => update('title', v)} />
          <Input label="Price" type="number" value={form.price} onChange={v => update('price', v)} />
          <Input label="Brand" value={form.brand} onChange={v => update('brand', v)} />
          <Input label="Category" value={form.category} onChange={v => update('category', v)} />
          <Input label="Stock" type="number" value={form.stock} onChange={v => update('stock', v)} />
          <Input label="Discount %" type="number" value={form.discount} onChange={v => update('discount', v)} />
          
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Rating" type="number" value={form.rating} onChange={v => update('rating', v)} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={3}
              value={form.description}
              onChange={e => update('description', e.target.value)}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Thumbnail URL</label>
            <input
              className="form-input"
              value={form.thumbnail}
              onChange={e => update('thumbnail', e.target.value)}
            />
          </div>

        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        </div>

      </div>
    </div>
  );
};

export default EditProductModal;

function Input({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}