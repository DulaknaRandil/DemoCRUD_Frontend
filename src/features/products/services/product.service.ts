// src/features/products/services/product.service.ts
import { Product } from '../types/product.types';

// Environment-based configuration
const getApiUrl = (): string => {
  console.log('Environment check:', {
    isServer: typeof window === 'undefined',
    vercelUrl: process.env.VERCEL_URL,
    externalApiUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL
  });
  
  if (typeof window === 'undefined') {
    // Server-side: use external API directly to avoid circular calls during SSR
    const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL || 'https://dulakna.runasp.net/api/products';
    console.log('Server-side API URL (direct external):', url);
    return url;
  }
  
  // Client-side: use local API routes that proxy to external API
  console.log('Client-side using local API routes: /api/products');
  return '/api/products';
};

const API_BASE_URL = getApiUrl();
console.log('Final API_BASE_URL:', API_BASE_URL);

// Response handler utility
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text() as unknown as T;
}

// API request builder with better error handling
const buildRequest = (method: string, body?: object): RequestInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config: RequestInit = {
    method,
    headers,
    mode: 'cors', // Explicitly set CORS mode
    credentials: 'omit', // Don't send credentials for external API
    ...(body && { body: JSON.stringify(body) }),
  };

  console.log(`API Request: ${method} ${API_BASE_URL}`, config);
  return config;
};

// Product service functions
export const ProductService = {
  /**
   * Fetch all products
   */
  async getAll(): Promise<Product[]> {
    try {
      const response = await fetch(API_BASE_URL, buildRequest('GET'));
      return handleApiResponse<Product[]>(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please try again.');
    }
  },

  /**
   * Fetch a single product by ID
   */
  async getById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, buildRequest('GET'));
      return handleApiResponse<Product>(response);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new Error(`Failed to fetch product with ID ${id}.`);
    }
  },

  /**
   * Create a new product
   */
  async create(data: Omit<Product, 'id'>): Promise<Product> {
    try {
      const response = await fetch(API_BASE_URL, buildRequest('POST', data));
      return handleApiResponse<Product>(response);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product. Please try again.');
    }
  },

  /**
   * Update an existing product
   */
  async update(id: number, data: Omit<Product, 'id'>): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, buildRequest('PUT', data));
      await handleApiResponse<{ success: boolean }>(response);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw new Error(`Failed to update product with ID ${id}.`);
    }
  },

  /**
   * Delete a product
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, buildRequest('DELETE'));
      await handleApiResponse<{ success: boolean }>(response);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw new Error(`Failed to delete product with ID ${id}.`);
    }
  },
};

// Export individual functions for backward compatibility
export const fetchProducts = ProductService.getAll;
export const fetchProduct = ProductService.getById;
export const createProduct = ProductService.create;
export const updateProduct = ProductService.update;
export const deleteProduct = ProductService.delete;
