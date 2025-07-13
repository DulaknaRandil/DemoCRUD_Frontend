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
    
    // Validate ID
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
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
    
    const data = await response.json();
    return NextResponse.json(data, { status: HttpStatus.OK });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
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
