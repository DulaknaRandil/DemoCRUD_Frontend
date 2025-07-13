// src/app/products/[id]/page.tsx
import { fetchProduct } from '@/shared/utils/api.utils';
import ClientView from './edit/ClientView';

export default async function ViewPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const prod = await fetchProduct(Number(id));
    return <ClientView prod={prod} />;
  } catch (error) {
    console.error('Error fetching product in ViewPage:', error);
    // Return a fallback UI for server-side errors
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h1>
          <p className="text-gray-600">Unable to load the product. Please try again later.</p>
        </div>
      </div>
    );
  }
}
