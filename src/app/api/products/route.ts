import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/shared/config/app.config';
import { HttpStatus } from '@/shared/types/api.types';

const API_BASE = config.externalApiUrl;

export async function GET() {
  try {
    const response = await fetch(API_BASE, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: HttpStatus.OK });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || body.price === undefined || body.quantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, quantity' },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: HttpStatus.CREATED });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
