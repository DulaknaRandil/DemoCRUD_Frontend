"use client";
import styles from '../styles/ProductCard.module.css';
import { Product } from '../types/product.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteProduct } from '@/shared/utils/api.utils';
import { useNotification } from '@/shared/components';
import JellyButton from '@/shared/components/ui/JellyButton';
import AlertDialog from '@/shared/components/ui/AlertDialog';

interface Props { 
  product: Product; 
  onDelete?: () => void;
}

export default function ProductCard({ product, onDelete }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { showNotification } = useNotification();

  const handleView = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    router.push(`/products/${product.id}`);
  };

  const handleEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    router.push(`/products/${product.id}/edit`);
  };

  const handleDelete = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setShowDeleteAlert(false);
    
    try {
      await deleteProduct(product.id);
      showNotification('🗑️ Product deleted successfully!', 'success');
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('❌ Failed to delete product. Please try again.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteAlert(false);
  };

  const totalValue = product.price * product.quantity;

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.productIcon}>
              📦
            </div>
          </div>
          
          <div className={styles.cardBody}>
            <div className={styles.priceSection}>
              <span className={styles.priceLabel}>💰 Price</span>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>
            
            <div className={styles.statsContainer}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>📊 Qty</span>
                <span className={styles.statValue}>{product.quantity}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>💎 Value</span>
                <span className={styles.statValue}>${totalValue.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.cardActions}>
            <JellyButton 
              onClick={handleView}
              className="info"
            >
              <span className={styles.buttonIcon}>👁️</span>
              <span className={styles.buttonText}>View</span>
            </JellyButton>
            <JellyButton 
              onClick={handleEdit}
              className="warning"
            >
              <span className={styles.buttonIcon}>✏️</span>
              <span className={styles.buttonText}>Edit</span>
            </JellyButton>
            <JellyButton 
              onClick={handleDelete}
              className="danger"
              disabled={isDeleting}
            >
              <span className={styles.buttonIcon}>🗑️</span>
              <span className={styles.buttonText}>{isDeleting ? '...' : 'Del'}</span>
            </JellyButton>
          </div>
        </div>
      </div>

      <AlertDialog
        isOpen={showDeleteAlert}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </>
  );
}
