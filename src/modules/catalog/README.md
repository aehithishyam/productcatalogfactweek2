# Product Catalog Module

A high-performance, customer-facing product catalog component built with React, advanced filtering, debounced search, sorting, and infinite scrolling capabilities
---

##  How to Understand the Flow (Beginner Guide)

### Step-by-Step Data Flow

```
Page loads
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. ProductCatalogPage.tsx mounts                               │
│     └── Initializes state: search='', filters={}, page=1       │
│     └── Calls useProducts() hook                                │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. useProducts() Hook (in hooks.ts)                            │
│     └── useEffect triggers on mount                             │
│     └── Sets loading = true                                     │
│     └── Fetches from https://dummyjson.com/products             │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. API Returns Data                                            │
│     └── Products array stored in state                          │
│     └── Categories extracted for filter dropdown                │
│     └── loading = false, page renders products                  │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. User Types in Search Box                                    │
│     └── SearchBar calls onChange with each keystroke            │
│     └── useDebounce waits 300ms after typing stops              │
│     └── Debounced value updates, triggering filter              │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. Filtering (useMemo in ProductCatalogPage)                   │
│     └── Takes all products from API                             │
│     └── Filters by: search text, category, price range          │
│     └── Returns filteredProducts array                          │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. Sorting (useMemo)                                           │
│     └── Takes filteredProducts                                  │
│     └── Sorts by: name, price, rating (asc/desc)                │
│     └── Returns sortedProducts array                            │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  7.  Infinite Scrolling                                         │
│     └── Takes sortedProducts                                    │
│     └── Shows first 12 items    │
│     └── Loads next batch when user scrolls near bottom
|     └──  Continues until all items are loaded
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  8. Render                                                      │
│     └── ProductGrid receives visibleProducts                  │
│     └── Each ProductCard displays one product                   │
│     └── Loading indicator shown while fetching more                      │
└─────────────────────────────────────────────────────────────────┘
```

### Key Files to Read (In Order)

1. **Start here → `types.ts`**
   - Understand what a Product looks like
   - See ProductFilters interface
   - Learn about SortOption type

2. **Next → `hooks.ts`**
   - useProducts() - fetches data from API
   - useDebounce() - delays search input
   - useInfiniteScroll() - Scrolls Infinite
   - Understand loading/error states

3. **Then → `ProductCatalogPage.tsx`**
   - See all state variables at the top
   - Follow the filter → sort → scroll pipeline
   - Understand how components connect

4. **Finally → `components/`**
   - Each component does ONE thing
   - Props come from parent, callbacks go to parent

### The Data Pipeline
API → Store Data → Search → Filter → Sort → Load in batches → Display
```
API Products (100 items)
        │
        ▼
   ┌─────────┐
   │ FILTER  │  ← search + category + price
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │  SORT   │  ← name/price/rating + asc/desc
   └────┬────┘
        │
        ▼
  ┌──────────────┐
  │ INFINITE LOAD│  ← load 12 more on scroll
  └────┬─────────┘
       │
       ▼
    Display
```

### Understanding the Debounce Pattern

```
Without debounce:
User types: "p" → API call
User types: "ph" → API call
User types: "pho" → API call
User types: "phon" → API call
User types: "phone" → API call
= 5 filter operations!

With debounce (800ms delay):
User types: "phone" quickly
Wait 800ms....
= 1 filter operation!

```

```tsx
// How debounce works
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);  // Update after delay
    }, delay);
    
    return () => clearTimeout(timer);  // Cancel if value changes
  }, [value, delay]);
  
  return debouncedValue;
}
```

### Understanding Controlled Components

```tsx
// Parent (ProductCatalogPage.tsx)
const [search, setSearch] = useState('');

<SearchBar 
  value={search}        // Parent controls the value
  onChange={setSearch}  // Child reports changes to parent
/>

// Child (SearchBar.tsx)
function SearchBar({ value, onChange }) {
  return (
    <input 
      value={value}                    // Display parent's value
      onChange={e => onChange(e.target.value)}  // Tell parent about changes
    />
  );
}
```

### Common Questions

**Q: Why use useMemo for filtering?**
A: Filtering 100 products on every render is wasteful. useMemo caches the result and only recalculates when inputs change.

**Q: Why does changing filters reset to page 1?**
A: If you're on page 5 and filter to 10 results, page 5 wouldn't exist. Resetting prevents showing empty results.

**Q: Why are components wrapped in React.memo?**
A: memo() prevents re-rendering a component if its props haven't changed. This improves performance.

**Q: Why use infinite scrolling instead of pagination?**
A: Infinite scrolling provides a smoother user experience, reduces navigation friction, and allows batched rendering for better performance on large datasets.

---

## Features

- **Debounced Search**: 300ms debounce on search input to prevent excessive API calls and re-renders
- **Multi-Criteria Filtering**: Filter by category, price range, and minimum rating
- **Sorting Options**: Sort by name, price, or rating in ascending/descending order
- **Infinite Scrolling**: Products are loaded in batches as the user scrolls

- **Responsive Design**: Adapts from 4-column grid on desktop to 2-column on mobile
- **Loading/Error/Empty States**: Clear UI feedback for all data states

## Performance Optimizations

### 1. Component Memoization
All child components use `React.memo()` to prevent unnecessary re-renders:
- `SearchBar` - Only re-renders when value changes
- `SortDropdown` - Only re-renders when sort options change
- `FilterPanel` - Only re-renders when filters or categories change
- `ProductCard` - Only re-renders when product data changes
- `ProductGrid` - Only re-renders when product array changes
- `Infinite Scroll`- Trigger - Uses IntersectionObserver to load items efficiently


### 2. Debounced Search
Search input uses a custom `useDebounce` hook with 300ms delay:
- Prevents filtering on every keystroke
- Reduces CPU usage during typing
- Smoother user experience

### 3. Memoized Filtering & Sorting
The `filteredProducts` computation uses `useMemo` to:
- Only recalculate when dependencies change (products, search, filters)
- Avoid expensive array operations on every render
- Chain filter operations efficiently

### 4. Callback Memoization
Event handlers use `useCallback` to:
- Maintain referential equality across renders
- Prevent child component re-renders from prop changes

### 5. Lazy Image Loading
Product images use `loading="lazy"` attribute:
- Defers off-screen image loading
- Reduces initial page load time
- Saves bandwidth for users

### 6. Request Cancellation
API requests use `AbortController`:
- Cancels pending requests on component unmount
- Prevents memory leaks and race conditions

## Architecture

```
src/modules/catalog/
├── index.ts                 # Module exports
├── types.ts                 # TypeScript interfaces
├── hooks.ts                 # Custom hooks (useProducts, useDebounce)
├── hooks/useInfiniteScroll.ts  # Infinite scroll logic (IntersectionObserver)
├── ProductCatalogPage.tsx   # Main page component
├── components/
│   ├── index.ts             # Component exports
│   ├── SearchBar.tsx        # Debounced search input
│   ├── SortDropdown.tsx     # Sort options
│   ├── FilterPanel.tsx      # Collapsible filter sidebar
│   ├── ProductCard.tsx      # Individual product display
│   └── ProductGrid.tsx      # Grid layout container
└── styles/
    └── catalog.css          # Module-specific styles
```

## API Integration

Uses [DummyJSON](https://dummyjson.com/) public API:
- Endpoint: `https://dummyjson.com/products?limit=1000`
- Returns: Product array with title, price, rating, category, images, etc.

## Usage

The module is self-contained and can be imported into any React application:

```tsx
import { ProductCatalogPage } from './modules/catalog';

function App() {
  return <ProductCatalogPage />;
}
```

## Filter Options

| Filter | Type | Description |
|--------|------|-------------|
| Search | Text | Searches title, description, brand, category |
| Category | Dropdown | Filter by product category |
| Price Range | Number inputs | Min/max price filter |
| Rating | Button group | Minimum star rating (1-4) |

Product Management (Add / Edit / Delete)
- The catalog supports full client-side product management using modal forms with persistent storage via localStorage.
-These features allow users to create, update, and remove products without modifying the public API data.

How Product Management Works

Because the public API is read-only, all modifications are handled locally:

- Added products → stored in localStorage

- Edited products → override API products locally

- Deleted products → tracked by ID and hidden from UI

On every page load:
API products fetched
        +
Local added products
        -
Deleted product IDs
----------------------
Final product list shown in UI


Add Product Flow
----------------------
User clicks "Add Product"
        │
        ▼
AddProductModal opens
        │
        ▼
User fills form (title, price, rating, stock, etc.)
        │
        ▼
Product saved to localStorage
        │
        ▼
UI updates immediately

Storage key:catalog_local_products


Edit Product Flow
----------------------

User clicks "Delete Product"
        │
        ▼
Manage Products modal opens
        │
        ▼
User clicks "Edit"
        │
        ▼
EditProductModal opens (pre-filled)
        │
        ▼
Changes saved
        │
        ▼
Local product list updated

Implementation details

- Form is initialized from the selected product
- Uses a single form state object (performance optimized)
- Edited API products are stored locally to override   original API data

Delete Product Flow
----------------------
User clicks "Delete Product"
        │
        ▼
Manage Products modal opens
        │
        ▼
User clicks "Delete"
        │
        ▼
Product ID stored in localStorage
        │
        ▼
Product removed from UI

Storage key:catalog_deleted_product_ids

Local Storage Design
Key	                           Purpose
catalog_local_products	       Stores added & edited products
catalog_deleted_product_ids    Stores IDs of deleted products

## Responsive Breakpoints

- **Desktop** (>1024px): Full-width layout + 4-column grid

- **Tablet** (768-1024px): Collapsible filters + 3-column grid
- **Mobile** (<640px): Stacked layout + 2-column grid

## Assignment Compliance

This project satisfies the following requirements:

- Public API consumption (DummyJSON)
- Debounced search input
- Multi-criteria filtering
- Sorting options
- Infinite scrolling
- Optimized rendering using memoization and batching
- Clear loading, error, and empty states
