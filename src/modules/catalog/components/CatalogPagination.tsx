// import { memo } from 'react';

// interface CatalogPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
//   onPageChange: (page: number) => void;
// }

// const CatalogPagination = memo(function CatalogPagination({
//   currentPage,
//   totalPages,
//   totalItems,
//   itemsPerPage,
//   onPageChange,
// }: CatalogPaginationProps) {
//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const maxVisible = 5;
    
//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) {
//           pages.push(i);
//         }
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         pages.push(1);
//         pages.push('...');
//         pages.push(currentPage - 1);
//         pages.push(currentPage);
//         pages.push(currentPage + 1);
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }
    
//     return pages;
//   };

//   if (totalPages <= 1) return null;

//   return (
//     <div className="catalog-pagination">
//       <span className="catalog-pagination-info">
//         Showing {startItem}–{endItem} of {totalItems} products
//       </span>
//       <div className="catalog-pagination-controls">
//         <button
//           className="catalog-pagination-btn"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           ‹ Prev
//         </button>
        
//         {getPageNumbers().map((page, index) => (
//           typeof page === 'number' ? (
//             <button
//               key={index}
//               className={`catalog-pagination-btn ${currentPage === page ? 'active' : ''}`}
//               onClick={() => onPageChange(page)}
//             >
//               {page}
//             </button>
//           ) : (
//             <span key={index} className="catalog-pagination-ellipsis">{page}</span>
//           )
//         ))}
        
//         <button
//           className="catalog-pagination-btn"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next ›
//         </button>
//       </div>
//     </div>
//   );
// });

// export default CatalogPagination;

export {};