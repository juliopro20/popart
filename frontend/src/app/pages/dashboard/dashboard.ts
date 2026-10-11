import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../../type';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-base-200 p-4 sm:p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-base-100 p-4 rounded-box shadow-sm">
          <div class="flex items-center gap-4">
            <a routerLink="/" class="btn btn-ghost btn-sm">Store</a>
            <h1 class="text-xl sm:text-2xl font-bold text-center sm:text-left">PopArt Admin Dashboard</h1>
          </div>
          <button (click)="logout()" class="btn btn-error btn-sm text-white w-full sm:w-auto">Logout</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Add Product Form -->
          <div class="bg-base-100 p-4 sm:p-6 rounded-box shadow-md border border-base-300">
            <h2 class="text-lg sm:text-xl font-bold mb-4">Add New Balloon Product</h2>
            
            <form (submit)="createProduct($event)" class="space-y-4">
              <div>
                <label class="label font-medium text-sm sm:text-base">Product Title</label>
                <input
                  type="text"
                  [(ngModel)]="title"
                  name="title"
                  required
                  class="input input-bordered w-full text-sm sm:text-base"
                  placeholder="e.g. Giant Birthday Arch"
                />
              </div>

              <div>
                <label class="label font-medium text-sm sm:text-base">Product Image File (Device Storage)</label>
                <input
                  type="file"
                  accept="image/*"
                  (change)="onFileSelected($event)"
                  required
                  class="file-input file-input-bordered w-full text-xs sm:text-sm"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label font-medium text-sm sm:text-base">Rental Price ($)</label>
                  <input
                    type="number"
                    [(ngModel)]="rentalPrice"
                    name="rentalPrice"
                    required
                    class="input input-bordered w-full text-sm sm:text-base"
                    placeholder="45"
                  />
                </div>
                <div>
                  <label class="label font-medium text-sm sm:text-base">Purchase Price ($)</label>
                  <input
                    type="number"
                    [(ngModel)]="purchasePrice"
                    name="purchasePrice"
                    required
                    class="input input-bordered w-full text-sm sm:text-base"
                    placeholder="150"
                  />
                </div>
              </div>

              <div>
                <label class="label font-medium text-sm sm:text-base">Category</label>
                <select
                  [(ngModel)]="category"
                  name="category"
                  required
                  class="select select-bordered w-full text-sm sm:text-base"
                >
                  <option value="" disabled selected>Select a category</option>
                  <option value="Arches">Arches</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label class="label font-medium text-sm sm:text-base">Description</label>
                <textarea
                  [(ngModel)]="description"
                  name="description"
                  class="textarea textarea-bordered w-full h-24 text-sm sm:text-base"
                  placeholder="Description of the balloon arrangement..."
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full" [disabled]="isLoading()">
                @if (isLoading()) {
                  <span class="loading loading-spinner"></span>
                }
                Save Product
              </button>
            </form>
          </div>

          <!-- Inventory List -->
          <div class="lg:col-span-2 bg-base-100 p-4 sm:p-6 rounded-box shadow-md border border-base-300">
            <h2 class="text-lg sm:text-xl font-bold mb-4">Inventory List ({{ products().length }})</h2>
            
            <div class="space-y-4">
              @for (product of products(); track product._id) {
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-base-300 rounded-box bg-base-50 gap-4">
                  <div class="flex items-center gap-4 w-full sm:w-auto">
                    <img [src]="product.imageUrl" [alt]="product.title" class="w-16 h-16 object-cover rounded-box flex-shrink-0" />
                    <div class="min-w-0">
                      <h3 class="font-bold text-base sm:text-lg truncate">{{ product.title }}</h3>
                      <p class="text-xs sm:text-sm text-base-content/70">
                        Rent: &#36;{{ product.rentalPrice }} | Buy: &#36;{{ product.purchasePrice }} | <span class="badge badge-outline badge-xs">{{ product.category }}</span>
                      </p>
                    </div>
                  </div>
                  <button (click)="deleteProduct(product._id!, product.title)" class="btn btn-ghost btn-sm text-error self-end sm:self-center">
                    Delete
                  </button>
                </div>
              } @empty {
                <p class="text-base-content/60 text-center py-8 text-sm sm:text-base">No products found in inventory.</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class AdminDashboardComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  products = signal<Product[]>([]);
  isLoading = signal(false);

  title = '';
  rentalPrice: number | null = null;
  purchasePrice: number | null = null;
  category = '';
  description = '';
  selectedFile: File | null = null;

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const data = await this.apiService.getProducts();
    this.products.set(data);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async createProduct(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) return;

    this.isLoading.set(true);
    const token = localStorage.getItem('popart_admin_token') || '';

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('purchasePrice', String(this.purchasePrice));
    formData.append('rentalPrice', String(this.rentalPrice));
    formData.append('category', this.category);
    formData.append('image', this.selectedFile);

    const newProd = await this.apiService.createProduct(formData, token);
    this.isLoading.set(false);

    if (newProd) {
      this.loadProducts();
      this.title = '';
      this.rentalPrice = null;
      this.purchasePrice = null;
      this.category = '';
      this.description = '';
      this.selectedFile = null;
    }
  }

  async deleteProduct(id: string, title: string) {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem('popart_admin_token') || '';
    const success = await this.apiService.deleteProduct(id, token);
    if (success) {
      this.loadProducts();
    }
  }

  logout() {
    localStorage.removeItem('popart_admin_token');
    this.router.navigate(['/admin/login']);
  }
}