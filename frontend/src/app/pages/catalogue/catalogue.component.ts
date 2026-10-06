import { Component, inject, resource, computed, effect, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton/product-card-skeleton.component';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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
            <button class="text-xs font-semibold text-primary hover:underline">Reset Filters</button>
          </div>

          <!-- Price Range Section -->
          <div class="space-y-3">
            <label class="font-semibold text-sm">Price Range</label>
            <input type="range" min="0" max="300" value="300" class="range range-primary range-xs w-full" />
            <div class="flex justify-between text-xs text-base-content/60">
              <span>$0</span>
              <span>$300</span>
            </div>
          </div>

          <!-- Quick Select Buttons -->
          <div class="space-y-2">
            <span class="text-xs font-semibold text-base-content/60 block">Quick Select:</span>
            <div class="grid grid-cols-2 gap-2">
              <button class="btn btn-outline btn-xs">Under $50</button>
              <button class="btn btn-outline btn-xs">$50-$100</button>
              <button class="btn btn-outline btn-xs">$100-$150</button>
              <button class="btn btn-outline btn-xs">$150+</button>
            </div>
          </div>

          <!-- Categories Checkboxes -->
          <div class="space-y-3 pt-2 border-t border-base-200">
            <span class="font-semibold text-sm block">Balloon Categories</span>
            <div class="space-y-2 text-sm">
              <label class="flex items-center justify-between cursor-pointer">
                <span class="flex items-center gap-2"><input type="checkbox" checked class="checkbox checkbox-xs checkbox-primary" /> Arches</span>
                <span class="text-xs text-base-content/50">4</span>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="flex items-center gap-2"><input type="checkbox" class="checkbox checkbox-xs checkbox-primary" /> Birthday</span>
                <span class="text-xs text-base-content/50">3</span>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="flex items-center gap-2"><input type="checkbox" class="checkbox checkbox-xs checkbox-primary" /> Wedding</span>
                <span class="text-xs text-base-content/50">2</span>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="flex items-center gap-2"><input type="checkbox" class="checkbox checkbox-xs checkbox-primary" /> Corporate</span>
                <span class="text-xs text-base-content/50">3</span>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="flex items-center gap-2"><input type="checkbox" class="checkbox checkbox-xs checkbox-primary" /> Custom</span>
                <span class="text-xs text-base-content/50">3</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Main Content Grid -->
        <main class="flex-1 space-y-6">
          <div class="flex flex-col border-b border-base-200 pb-4">
            <h1 class="text-2xl font-bold">PopArt Inflatable Collection</h1>
            <p class="text-sm text-base-content/60">
              Showing {{ productsResource.value()?.length || 0 }} products
            </p>
          </div>

          @if (isLoading()) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (item of [1,2,3,4,5,6]; track item) {
                <app-product-card-skeleton />
              }
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (product of productsResource.value(); track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          }
        </main>

      </div>
    </div>
    <app-footer />
  `,
})
export class CatalogueComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Catalogue - PopArt Inflatable Balloons');
    this.meta.updateTag({
      name: 'description',
      content: 'Browse our collection of inflatable balloon arches, rental packages, and event decoration options.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Catalogue' });
  }

  private readonly apiService = inject(ApiService);

  productsResource = resource({
    loader: () => this.apiService.getProducts(),
  });

  isLoading = computed(() => this.productsResource.isLoading());

  errorEffect = effect(() => {
    const error = this.productsResource.error() as Error;
    if (error) {
      console.log(error);
    }
  });
}