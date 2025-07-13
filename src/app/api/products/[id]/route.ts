import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/shared/config/app.config';
import { HttpStatus } from '@/shared/types/api.types';

const API_BASE = config.externalApiUrl;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('API Route: Fetching product with ID', id);
    
    // Validate ID
    if (!id || isNaN(Number(id))) {
      console.error('API Route: Invalid ID provided', id);
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    const url = `${API_BASE}/${id}`;
    console.log('API Route: Fetching from', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NextJS-App/1.0',
      },
    });
    
    console.log('API Route: Response status', response.status);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log('API Route: Product not found', id);
        return NextResponse.json(
          { error: 'Product not found' },
          { status: HttpStatus.NOT_FOUND }
        );
      }
      console.error('API Route: HTTP error', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Route: Successfully fetched product', data);
    
    return NextResponse.json(data, { 
      status: HttpStatus.OK,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('API Route: Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate ID
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    // Validate required fields
    if (!body.name || body.price === undefined || body.quantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, quantity' },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: HttpStatus.NOT_FOUND }
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return NextResponse.json({ success: true }, { status: HttpStatus.OK });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Validate ID
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: HttpStatus.NOT_FOUND }
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return NextResponse.json({ success: true }, { status: HttpStatus.OK });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
