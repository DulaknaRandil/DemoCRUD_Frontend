// src/config/app.config.ts
interface AppConfig {
  baseUrl: string;
  externalApiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  apiTimeout: number;
}

const getConfig = (): AppConfig => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    externalApiUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL || 'http://dulakna.runasp.net/api/products',
    isDevelopment,
    isProduction,
    apiTimeout: 30000, // 30 seconds
  };
};

export const config = getConfig();

// Runtime environment check
export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';
