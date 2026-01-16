import { useState, useEffect } from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import { ProductCatalogPage } from './modules/catalog';
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="app-layout">
      <Header title="Uni Mart Shopping" />

      <main className="main-content">
        <ProductCatalogPage showNotification={showNotification} />
      </main>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
