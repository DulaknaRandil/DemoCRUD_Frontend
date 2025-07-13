'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/features/products/components/ProductCard';
import { fetchProducts } from '@/shared/utils/api.utils';
import styles from '@/features/products/styles/ProductList.module.css';
import { Product } from '@/features/products/types/product.types';
import { useNotification } from '@/shared/components';
import JellyButton from '@/shared/components/ui/JellyButton';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  const router = useRouter();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const list = await fetchProducts();
      setProducts(list);
    } catch (error) {
      console.error('Error loading products:', error);
      showNotification('❌ Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const list = await fetchProducts();
        setProducts(list);
      } catch (error) {
        console.error('Error loading products:', error);
        showNotification('❌ Failed to load products', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [showNotification]);

  const handleProductDeleted = () => {
    loadProducts(); // Refresh the list after deletion
  };
  
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Product Catalog</h1>
          <p className={styles.subtitle}>
            Manage your inventory
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <JellyButton 
            onClick={() => router.push('/products/new')}
            className="success"
          >
            Add Product
          </JellyButton>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <h2>No Products Yet</h2>
          <p>Start building your catalog by adding your first product!</p>
          <JellyButton 
            onClick={() => router.push('/products/new')}
            className="success"
          >
            Create Product
          </JellyButton>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={handleProductDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
