'use client';

import ProductForm from '@/features/products/components/ProductForm';
import { createProduct } from '@/shared/utils/api.utils';
import { useRouter } from 'next/navigation';
import { Product } from '@/features/products/types/product.types';

export default function NewPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: Omit<Product, 'id'>) => {
    await createProduct(data);
    router.push('/products');
  };

  return <ProductForm onSubmit={handleSubmit} />;
}
