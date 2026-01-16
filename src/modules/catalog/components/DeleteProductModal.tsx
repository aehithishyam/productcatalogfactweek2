import type { Product } from '../types';

interface Props {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit?: (product: Product) => void;
}

function DeleteProductModal({ isOpen, products, onClose, onDelete, onEdit }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Manage Products</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {products.length === 0 && <p>No products available</p>}

          {products.map(product => (
            <div
              key={product.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #eee',
                gap: '12px',
              }}
            >
              <span style={{ flex: 1 }}>{product.title}</span>

              <div style={{ display: 'flex', gap: '8px' }}>
                {onEdit && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                        onEdit?.(product);
                        onClose();
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    onDelete(product.id);
                    onClose();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default DeleteProductModal;

