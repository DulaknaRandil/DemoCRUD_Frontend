// src/app/products/[id]/page.tsx
import { fetchProduct } from '@/shared/utils/api.utils';
import ClientView from './edit/ClientView';

export default async function ViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prod = await fetchProduct(Number(id));
  return <ClientView prod={prod} />;
}
