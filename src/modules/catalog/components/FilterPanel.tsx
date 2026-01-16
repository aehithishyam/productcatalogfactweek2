import { memo, useState, useCallback } from 'react';
import type { ProductFilters } from '../types';

interface FilterPanelProps {
  filters: ProductFilters;
  categories: string[];
  onFilterChange: (key: keyof ProductFilters, value: string | number) => void;
  onReset: () => void;
}

const FilterPanel = memo(function FilterPanel({
  filters,
  categories,
  onFilterChange,
  onReset,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handlePriceChange = useCallback((type: 'minPrice' | 'maxPrice', value: string) => {
    const numValue = value === '' ? (type === 'minPrice' ? 0 : 10000) : Number(value);
    onFilterChange(type, numValue);
  }, [onFilterChange]);

  const handleRatingChange = useCallback((value: string) => {
    onFilterChange('minRating', Number(value));
  }, [onFilterChange]);

  const hasActiveFilters = filters.category !== '' || 
    filters.minPrice > 0 || 
    filters.maxPrice < 10000 || 
    filters.minRating > 0;

  return (
    <aside className="filter-panel">
      <header className="filter-panel-header">
        <h3 className="filter-panel-title">Filters</h3>
        <button 
          className="filter-panel-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </header>

      {isExpanded && (
        <div className="filter-panel-body">
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              className="filter-select"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <div className="filter-range">
              <input
                type="number"
                className="filter-input"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                min={0}
              />
              <span className="filter-range-separator">–</span>
              <input
                type="number"
                className="filter-input"
                placeholder="Max"
                value={filters.maxPrice === 10000 ? '' : filters.maxPrice}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                min={0}
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Minimum Rating</label>
            <div className="filter-rating">
              {[0, 1, 2, 3, 4].map((rating) => (
                <button
                  key={rating}
                  className={`filter-rating-btn ${filters.minRating === rating ? 'active' : ''}`}
                  onClick={() => handleRatingChange(String(rating))}
                >
                  {rating === 0 ? 'All' : `${rating}+★`}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button className="filter-reset-btn" onClick={onReset}>
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </aside>
  );
});

export default FilterPanel;
