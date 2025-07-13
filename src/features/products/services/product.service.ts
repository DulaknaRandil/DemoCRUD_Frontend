// src/features/products/services/product.service.ts
import { Product } from '../types/product.types';

// Environment-based configuration
const getBaseUrl = (): string => {
  // For server-side rendering, use full URL
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }
  // For client-side, use relative URLs
  return '';
};

const API_BASE_URL = `${getBaseUrl()}/api/products`;

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

// API request builder
const buildRequest = (method: string, body?: object): RequestInit => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  ...(body && { body: JSON.stringify(body) }),
});

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
