import { Injectable } from '@angular/core';
import { Product } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'https://popart.onrender.com';

  // Get all products (with optional category filter)
  async getProducts(category?: string): Promise<Product[]> {
    const endpoint = category 
      ? `${this.url}/products?category=${encodeURIComponent(category)}` 
      : `${this.url}/products`;
    
    try {
      const response = await fetch(endpoint);
      return (await response.json()) ?? [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  // Get limited products (falls back to filtering/slicing local array if limit is needed)
  async getProductsWithLimit(
    limit: number,
    category?: string
  ): Promise<Product[]> {
    const products = await this.getProducts(category);
    return products.slice(0, limit);
  }

  // Get single product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.url}/products/${id}`);
      if (!response.ok) return null;
      return (await response.json()) ?? null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  }

  // Admin: Login
  async loginAdmin(credentials: { email: string; password: string }): Promise<{ token: string; message: string } | null> {
    try {
      const response = await fetch(`${this.url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  // Admin: Create product (multipart/form-data with image file)
  async createProduct(formData: FormData, token: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.url}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  }

  // Admin: Delete product
  async deleteProduct(id: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
}