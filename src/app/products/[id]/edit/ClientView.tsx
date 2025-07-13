'use client';

import React from 'react';
import { Product } from '@/features/products/types/product.types';
import { deleteProduct } from '@/shared/utils/api.utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/features/products/styles/ProductDetail.module.css';
import { useNotification } from '@/shared/components';

interface Props { prod: Product; }

export default function ClientView({ prod }: Props) {
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleDelete = async () => {
    if (confirm(`🗑️ Are you sure you want to delete "${prod.name}"? This action cannot be undone.`)) {
      try {
        await deleteProduct(prod.id);
        showNotification('Product deleted successfully!', 'success');
        router.push('/products');
      } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Failed to delete product. Please try again.', 'error');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/products" className={styles.backButton}>
        ← Back to Products
      </Link>
      
      <h1 className={styles.title}>📦 {prod.name}</h1>
      
      <div className={styles.detail}>
        <span className={styles.label}>💰 Price:</span>
        <span className={styles.value}>${prod.price.toFixed(2)}</span>
      </div>
      
      <div className={styles.detail}>
        <span className={styles.label}>📊 Quantity:</span>
        <span className={styles.value}>{prod.quantity} units</span>
      </div>
      
      <div className={styles.detail}>
        <span className={styles.label}>💎 Total Value:</span>
        <span className={styles.value}>${(prod.price * prod.quantity).toFixed(2)}</span>
      </div>
      
      <div className={styles.buttonGroup}>
        <Link href={`/products/${prod.id}/edit`} className={styles.editButton}>
          ✏️ Edit Product
        </Link>
        <button onClick={handleDelete} className={styles.deleteButton}>
          🗑️ Delete Product
        </button>
      </div>
    </div>
  );
}
