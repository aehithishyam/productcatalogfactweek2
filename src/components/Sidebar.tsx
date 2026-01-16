// interface SidebarProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
//   isOpen: boolean;
//   onClose: () => void;
// }

// function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
//   const handleNavClick = (page: string) => {
//     onNavigate(page);
//     onClose();
//   };

//   return (
//     <>
//       <div
//         className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
//         onClick={onClose}
//       ></div>
//       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
//         <div className="sidebar-logo">AdminPanel</div>
//         <nav className="sidebar-nav">
//           <button
//             className={`sidebar-link ${currentPage === 'catalog' ? 'active' : ''}`}
//             onClick={() => handleNavClick('catalog')}
//           >
//             <span className="sidebar-icon">🛍️</span>
//             <span>Product Catalog</span>
//           </button>
//         </nav>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;

export {};