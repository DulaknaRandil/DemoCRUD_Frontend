'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '@/features/products/components/ProductForm';
import { fetchProduct, updateProduct } from '@/shared/utils/api.utils';
import { Product } from '@/features/products/types/product.types';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const prod = await fetchProduct(Number(params.id));
        setProduct(prod);
      } catch (error) {
        console.error('Error loading product:', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id, router]);

  const handleSubmit = async (data: Omit<Product, 'id'>) => {
    if (!product) return;
    
    try {
      await updateProduct(product.id, data);
      router.push(`/products/${product.id}`);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh', 
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh', 
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Product not found
      </div>
    );
  }

  return <ProductForm product={product} onSubmit={handleSubmit} />;
}
