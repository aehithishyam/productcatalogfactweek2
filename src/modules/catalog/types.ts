export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'title' | 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
}

export interface CatalogState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: ProductFilters;
}

export const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  category: '',
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  sortBy: 'title',
  sortOrder: 'asc',
};

export const MAX_PRICE = 10000;
