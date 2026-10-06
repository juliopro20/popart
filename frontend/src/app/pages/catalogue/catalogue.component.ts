import { Component, inject, resource, computed, signal, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SeoService } from '../../services/seo.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton/product-card-skeleton.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    ProductCardSkeletonComponent,
    FooterComponent,
  ],
  template: `
    <div class="mt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar Filters Section -->
        <aside class="w-full lg:w-64 space-y-6 bg-base-100 p-6 rounded-box border border-base-200 shadow-sm h-fit">
          <div class="flex items-center justify-between border-b border-base-200 pb-4">
            <h2 class="font-bold text-lg">Filters</h2>
            <button (click)="resetFilters()" class="text-xs font-semibold text-primary hover:underline">Reset Filters</button>
          </div>

          <!-- Price Range Section -->
          <div class="space-y-3">
            <label class="font-semibold text-sm">Price Range: \${{ maxPrice() }}</label>
            <input 
              type="range" 
              min="0" 
              max="300" 
              [ngModel]="maxPrice()" 
              (ngModelChange)="maxPrice.set($event)" 
              class="range range-primary range-xs w-full" 
            />
            <div class="flex justify-between text-xs text-base-content/60">
              <span>$0</span>
              <span>$300</span>
            </div>
          </div>

          <!-- Quick Select Buttons -->
          <div class="space-y-2">
            <span class="text-xs font-semibold text-base-content/60 block">Quick Select:</span>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="maxPrice.set(50)" class="btn btn-outline btn-xs">Under $50</button>
              <button (click)="maxPrice.set(100)" class="btn btn-outline btn-xs">$50-$100</button>
              <button (click)="maxPrice.set(150)" class="btn btn-outline btn-xs">$100-$150</button>
              <button (click)="maxPrice.set(300)" class="btn btn-outline btn-xs">$150+</button>
            </div>
          </div>

          <!-- Categories Checkboxes -->
          <div class="space-y-3 pt-2 border-t border-base-200">
            <span class="font-semibold text-sm block">Balloon Categories</span>
            <div class="space-y-2 text-sm">
              @for (category of availableCategories; track category) {
                <label class="flex items-center justify-between cursor-pointer">
                  <span class="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      [checked]="selectedCategories().includes(category)"
                      (change)="toggleCategory(category)"
                      class="checkbox checkbox-xs checkbox-primary" 
                    /> 
                    {{ category }}
                  </span>
                </label>
              }
            </div>
          </div>
        </aside>

        <!-- Main Content Grid -->
        <main class="flex-1 space-y-6">
          <div class="flex flex-col border-b border-base-200 pb-4">
            <h1 class="text-2xl font-bold">PopArt Inflatable Collection</h1>
            <p class="text-sm text-base-content/60">
              Showing {{ filteredProducts().length }} products
            </p>
          </div>

          @if (isLoading()) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (item of [1,2,3,4,5,6]; track item) {
                <app-product-card-skeleton />
              }
            </div>
          } @else {
            @if (filteredProducts().length > 0) {
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (product of filteredProducts(); track product.id || product._id) {
                  <app-product-card [product]="product" />
                }
              </div>
            } @else {
              <div class="text-center py-16 bg-base-100 rounded-box border border-base-200">
                <p class="text-base-content/60 font-medium">No products found matching your filter criteria.</p>
                <button (click)="resetFilters()" class="btn btn-primary btn-sm mt-4">Clear Filters</button>
              </div>
            }
          }
        </main>

      </div>
    </div>
    <app-footer />
  `,
})
export class CatalogueComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly seo = inject(SeoService);

  // Filter state signals
  maxPrice = signal<number>(300);
  selectedCategories = signal<string[]>([]);
  availableCategories = ['Arches', 'Birthday', 'Wedding', 'Corporate', 'Custom'];

  ngOnInit() {
    this.seo.generateTags({
      title: 'Catalogue | PopArt Inflatable Balloons',
      description: 'Browse our collection of inflatable balloon arches, rental packages, and event decoration options.',
      url: 'https://popart-psi.vercel.app/catalogue'
    });
  }

  productsResource = resource({
    loader: () => this.apiService.getProducts(),
  });

  isLoading = computed(() => this.productsResource.isLoading());

  // Computed filter logic that runs reactively when products, price, or categories change
  filteredProducts = computed(() => {
    const products = this.productsResource.value() || [];
    const maxVal = this.maxPrice();
    const categories = this.selectedCategories();

    return products.filter((product: any) => {
      const matchesPrice = (product.price ?? 0) <= maxVal;
      const matchesCategory = categories.length === 0 || categories.includes(product.category);
      return matchesPrice && matchesCategory;
    });
  });

  toggleCategory(category: string) {
    const current = this.selectedCategories();
    if (current.includes(category)) {
      this.selectedCategories.set(current.filter(c => c !== category));
    } else {
      this.selectedCategories.set([...current, category]);
    }
  }

  resetFilters() {
    this.maxPrice.set(300);
    this.selectedCategories.set([]);
  }

  errorEffect = computed(() => {
    const error = this.productsResource.error() as Error;
    if (error) {
      console.error(error);
    }
    return error;
  });
}