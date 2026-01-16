import { memo } from 'react';

interface SortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

const SortDropdown = memo(function SortDropdown({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortDropdownProps) {
  return (
    <div className="catalog-sort">
      <label className="catalog-sort-label">Sort by:</label>
      <select
        className="catalog-sort-select"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="title">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <button
        className="catalog-sort-order"
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
});

export default SortDropdown;
