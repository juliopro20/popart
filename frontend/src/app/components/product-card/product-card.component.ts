import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../../type';
import {
  faEye,
  faHeart,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { FavoriteItemsLocalStorageService } from '../../services/favorite-items-local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  template: `
    <div
      class="card hover:bg-base-200 transition-all bg-base-100 w-full h-full shadow-sm flex flex-col justify-between"
    >
      <figure class="relative">
        <img
          class="w-full h-[260px] object-cover"
          [src]="product()?.imageUrl"
          [alt]="product()?.title"
        />
        <div class="absolute top-2 right-2">
          <div class="badge badge-outline capitalize bg-base-100/80 backdrop-blur-sm">
            {{ product()?.category }}
          </div>
        </div>
      </figure>

      <div class="card-body flex-1 flex flex-col justify-between">
        <div>
          <h2 class="card-title text-base line-clamp-1">
            {{ product()?.title }}
          </h2>

          <!-- Dual Pricing Display -->
          <div class="flex items-center gap-x-4 my-2">
            <div>
              <span class="text-xs text-gray-400 block">Rent</span>
              <span class="text-lg font-bold text-primary">\${{ product()?.rentalPrice }}</span>
            </div>
            <div class="border-l pl-4">
              <span class="text-xs text-gray-400 block">Buy</span>
              <span class="text-lg font-semibold text-secondary">\${{ product()?.purchasePrice }}</span>
            </div>
          </div>

          <!-- Acquisition Type Toggle -->
          <div class="join w-full my-2">
            <button 
              type="button" 
              class="join-item btn btn-xs flex-1"
              [class.btn-active]="selectedType() === 'rent'"
              [class.btn-primary]="selectedType() === 'rent'"
              (click)="selectedType.set('rent')"
            >
              Rent It
            </button>
            <button 
              type="button" 
              class="join-item btn btn-xs flex-1"
              [class.btn-active]="selectedType() === 'buy'"
              [class.btn-secondary]="selectedType() === 'buy'"
              (click)="selectedType.set('buy')"
            >
              Buy It
            </button>
          </div>

          <p class="line-clamp-2 text-sm text-gray-500">
            {{ product()?.description }}
          </p>
        </div>

        <div class="card-actions mt-4 w-full flex flex-col gap-y-2">
          <div class="flex items-center gap-x-2 w-full justify-between">
            <div class="tooltip" data-tip="View Details">
              <button (click)="onClickNavigate()" class="btn btn-soft btn-sm">
                <fa-icon [icon]="faEye"></fa-icon> Details
              </button>
            </div>
            <div class="tooltip" data-tip="Favorite">
              <button
                (click)="toggleFavoriteItem()"
                [class]="
                  checkFavoriteItemAlreadyExist()
                    ? 'btn btn-soft btn-primary btn-sm'
                    : 'btn btn-soft btn-sm'
                "
              >
                <fa-icon [icon]="faHeart"></fa-icon>
              </button>
            </div>
          </div>

          <button
            [disabled]="checkItemAlreadyExist()"
            (click)="addItem()"
            class="w-full btn btn-primary btn-sm"
          >
            <fa-icon [icon]="faCartShopping"></fa-icon>
            {{ checkItemAlreadyExist() ? 'In Cart (' + selectedType() + ')' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  private readonly cartService = inject(CartService);
  private readonly favoriteItemsLocalStorageService = inject(
    FavoriteItemsLocalStorageService
  );
  private readonly router = inject(Router);

  faHeart = faHeart;
  faEye = faEye;
  faCartShopping = faCartShopping;
  product = input<Product>();

  // Local state mapped directly to 'rent' | 'buy'
  selectedType = signal<'rent' | 'buy'>('rent');

  addItem() {
    const p = this.product();
    if (!p) return;
    // Uses the global CartService method matching dual-pricing criteria
    this.cartService.addItem(p, this.selectedType());
  }

  checkItemAlreadyExist() {
    const p = this.product();
    const id = p?._id || p?.id;
    if (!id) return false;
    
    // Checks both product ID AND selected actionType ('rent' vs 'buy')
    return this.cartService.items().some(
      item => (item.product._id === id || item.product.id === id) && item.actionType === this.selectedType()
    );
  }

  checkFavoriteItemAlreadyExist() {
    const id = this.product()?._id || this.product()?._id;
    return this.favoriteItemsLocalStorageService.checkItemAlreadyExist(id!);
  }

  toggleFavoriteItem() {
    const p = this.product();
    if (!p) return;
    if (this.checkFavoriteItemAlreadyExist()) {
      this.favoriteItemsLocalStorageService.removeItem(p);
    } else {
      this.favoriteItemsLocalStorageService.addItem(p);
    }
  }

  onClickNavigate() {
    const id = this.product()?._id || this.product()?.id;
    this.router.navigate(['/products', id]);
  }
}