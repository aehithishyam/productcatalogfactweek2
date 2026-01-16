import { memo } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = memo(function SearchBar({ value, onChange, placeholder = 'Search products...' }: SearchBarProps) {
  return (
    <div className="catalog-search">
      <span className="catalog-search-icon">🔍</span>
      <input
        type="text"
        className="catalog-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="catalog-search-clear" onClick={() => onChange('')}>
          ×
        </button>
      )}
    </div>
  );
});

export default SearchBar;
