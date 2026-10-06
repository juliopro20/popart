import { Component, inject, input } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  template: `
    <div class="flex items-start justify-start gap-x-4 bg-base-100 p-4 rounded-box shadow-sm border border-base-200">
      <figure>
        <img
          class="h-[130px] w-[140px] object-cover rounded-md"
          [src]="cartItem()?.product?.imageUrl"
          [alt]="cartItem()?.product?.title"
        />
      </figure>
      <div class="w-full">
        <div class="space-y-1">
          <p class="font-bold text-lg">{{ cartItem()?.product?.title }}</p>
          <div class="badge badge-sm uppercase font-semibold" [class.badge-primary]="cartItem()?.actionType === 'rent'" [class.badge-secondary]="cartItem()?.actionType === 'buy'">
            {{ cartItem()?.actionType === 'rent' ? 'Rental' : 'Purchase' }}
          </div>
          <p class="font-bold text-lg text-primary mt-1">
            \${{ cartItem()?.actionType === 'rent' ? cartItem()?.product?.rentalPrice : cartItem()?.product?.purchasePrice }}
          </p>
        </div>
        <div class="mt-3 flex items-center justify-between gap-x-4">
          <div class="flex items-center gap-x-2">
            <button
              (click)="decrementItemQuantity()"
              class="btn btn-soft btn-sm"
            >
              <fa-icon [icon]="faMinus"></fa-icon>
            </button>
            <span class="font-semibold px-2">{{ cartItem()?.quantity }}</span>
            <button
              (click)="incrementItemQuantity()"
              class="btn btn-soft btn-sm"
            >
              <fa-icon [icon]="faPlus"></fa-icon>
            </button>
          </div>
          <button
            (click)="removeItemQuantity()"
            class="btn btn-soft btn-error btn-sm"
          >
            <fa-icon [icon]="faTrashCan"></fa-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShoppingCartItemComponent {
  private readonly cartService = inject(CartService);

  faPlus = faPlus;
  faMinus = faMinus;
  faTrashCan = faTrashCan;

  cartItem = input<CartItem>();

  incrementItemQuantity() {
    const item = this.cartItem();
    if (item && item.product._id) {
      this.cartService.updateQuantity(item.product._id, item.actionType, item.quantity + 1);
    }
  }

  decrementItemQuantity() {
    const item = this.cartItem();
    if (item && item.product._id) {
      this.cartService.updateQuantity(item.product._id, item.actionType, item.quantity - 1);
    }
  }

  removeItemQuantity() {
    const item = this.cartItem();
    if (item && item.product._id) {
      this.cartService.removeItem(item.product._id, item.actionType);
    }
  }
}