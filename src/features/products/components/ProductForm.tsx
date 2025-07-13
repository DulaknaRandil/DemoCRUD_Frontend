'use client';

import { useState } from 'react';
import { Product } from '../types/product.types';
import styles from '../styles/Forms.module.css';
import { useNotification } from '@/shared/components';
import JellyButton from '@/shared/components/ui/JellyButton';
import AnimatedCard from '@/shared/components/ui/AnimatedCard';
import { useRouter } from 'next/navigation';

interface Props {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => Promise<void>;
}

interface FormErrors {
  name?: string;
  price?: string;
  quantity?: string;
}

export default function ProductForm({ product, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    quantity: product?.quantity || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    }

    const price = Number(formData.price);
    if (!formData.price || isNaN(price)) {
      newErrors.price = 'Valid price is required';
    } else if (price < 0) {
      newErrors.price = 'Price must be positive';
    } else if (price > 999999) {
      newErrors.price = 'Price is too high';
    }

    const quantity = Number(formData.quantity);
    if (!formData.quantity || isNaN(quantity)) {
      newErrors.quantity = 'Valid quantity is required';
    } else if (quantity < 0) {
      newErrors.quantity = 'Quantity must be positive';
    } else if (quantity > 1000000) {
      newErrors.quantity = 'Quantity is too high';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started', { formData, isSubmitting });
    
    if (!validateForm()) {
      showNotification('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };
      
      console.log('Submitting data:', submitData);
      await onSubmit(submitData);
      
      showNotification(
        product ? '✅ Product updated successfully!' : '🎉 Product created successfully!',
        'success'
      );
      
      // Reset form after successful creation (not update)
      if (!product) {
        setFormData({ name: '', price: '', quantity: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification('❌ Failed to save product. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setFormData(prev => ({ ...prev, quantity: String(Math.max(0, newQuantity)) }));
    
    // Clear error when user changes quantity
    if (errors.quantity) {
      setErrors(prev => ({ ...prev, quantity: undefined }));
    }
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    router.push('/products');
  };

  return (
    <div className={styles.formContainer}>
      <AnimatedCard>
        <div className={styles.formContent}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>
              {product ? '✏️ Edit Product' : '➕ Add Product'}
            </h1>
            <p className={styles.subtitle}>
              {product ? 'Update details' : 'Add new item'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                🏷️ Name
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.name ? styles.error : formData.name.trim() ? styles.success : ''}`}
                  placeholder="Product name"
                  maxLength={100}
                />
                <span className={styles.inputIcon}>📝</span>
              </div>
              {errors.name && (
                <div className={styles.errorMessage}>
                  ⚠️ {errors.name}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>
                💰 Price
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.price ? styles.error : formData.price && Number(formData.price) > 0 ? styles.success : ''}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  max="999999"
                />
                <span className={styles.inputIcon}>$</span>
              </div>
              {errors.price && (
                <div className={styles.errorMessage}>
                  ⚠️ {errors.price}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="quantity" className={styles.label}>
                📦 Quantity
              </label>
              <div className={styles.quantityContainer}>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(Number(formData.quantity) - 1)}
                  disabled={Number(formData.quantity) <= 0}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`${styles.quantityInput} ${errors.quantity ? styles.error : formData.quantity && Number(formData.quantity) >= 0 ? styles.success : ''}`}
                  placeholder="0"
                  min="0"
                  max="1000000"
                />
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(Number(formData.quantity) + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {errors.quantity && (
                <div className={styles.errorMessage}>
                  ⚠️ {errors.quantity}
                </div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <JellyButton
                type="submit"
                className="success"
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  (product ? '💾 Saving...' : '✨ Creating...') : 
                  (product ? '💾 Update' : '✨ Create')
                }
              </JellyButton>
              
              <JellyButton
                type="button"
                onClick={handleCancel}
                className="secondary"
                disabled={isSubmitting}
              >
                Cancel
              </JellyButton>
            </div>
          </form>
        </div>
      </AnimatedCard>
    </div>
  );
}
