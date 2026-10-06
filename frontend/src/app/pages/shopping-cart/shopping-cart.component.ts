import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-base-200 p-6">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Your Balloon Cart</h1>
          <a routerLink="/" class="btn btn-outline btn-sm">Continue Shopping</a>
        </div>

        @if (cartService.items().length === 0) {
          <div class="bg-base-100 p-12 text-center rounded-box shadow-md">
            <p class="text-lg text-base-content/70 mb-4">Your cart is currently empty.</p>
            <a routerLink="/" class="btn btn-primary">Browse Balloons</a>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Cart Items List -->
            <div class="md:col-span-2 space-y-4">
              @for (item of cartService.items(); track item.product._id) {
                <div class="card bg-base-100 shadow-sm border border-base-300 p-4 flex flex-row items-center gap-4">
                  <img [src]="item.product.imageUrl" [alt]="item.product.title" class="w-20 h-20 object-cover rounded-box" />
                  <div class="flex-1">
                    <h3 class="font-bold text-lg">{{ item.product.title }}</h3>
                    <p class="text-sm text-base-content/70 capitalize">Option: <span class="badge badge-sm badge-accent">{{ item.actionType }}</span></p>
                    <p class="font-semibold text-primary mt-1">
                      &#36;{{ item.actionType === 'rent' ? item.product.rentalPrice : item.product.purchasePrice }} 
                      <span class="text-xs text-base-content/50">({{ item.actionType }})</span>
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <!-- Minus button -->
<button (click)="cartService.updateQuantity(item.product._id!, item.actionType, item.quantity - 1)" class="btn btn-square btn-sm">-</button>
                    <span>{{ item.quantity }}</span>
                    <button (click)="cartService.updateQuantity(item.product._id!, item.actionType, item.quantity + 1)" class="btn btn-square btn-sm">+</button>
                  </div>
                  <button (click)="cartService.removeItem(item.product._id!, item.actionType)" class="btn btn-ghost btn-sm text-error">✕</button>
                </div>
              }
            </div>

            <!-- Checkout Form & Summary -->
            <div class="bg-base-100 p-6 rounded-box shadow-md border border-base-300 h-fit">
              <h2 class="text-xl font-bold mb-4">Order Summary</h2>
              <div class="space-y-2 mb-4 text-sm">
                <div class="flex justify-between">
                  <span>Total Items:</span>
                  <span class="font-semibold">{{ cartService.totalCount() }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Estimated Total:</span>
                  <span class="text-primary">&#36;{{ cartService.totalPrice() }}</span>
                </div>
              </div>

              <div class="divider"></div>

              <h3 class="font-bold text-md mb-3">Delivery & Event Details</h3>
              <form (submit)="checkoutToMessenger($event)" class="space-y-3">
                <div>
                  <label class="label text-xs font-medium">Full Name</label>
                  <input type="text" [(ngModel)]="fullName" name="fullName" required class="input input-bordered input-sm w-full" placeholder="John Doe" />
                </div>
                <div>
                  <label class="label text-xs font-medium">Phone Number</label>
                  <input type="tel" [(ngModel)]="phoneNumber" name="phoneNumber" required class="input input-bordered input-sm w-full" placeholder="+237 ..." />
                </div>
                <div>
                  <label class="label text-xs font-medium">Event Date</label>
                  <input type="date" [(ngModel)]="eventDate" name="eventDate" required class="input input-bordered input-sm w-full" />
                </div>
                <div>
                  <label class="label text-xs font-medium">Delivery Address / Location</label>
                  <textarea [(ngModel)]="deliveryAddress" name="deliveryAddress" required class="textarea textarea-bordered textarea-sm w-full" placeholder="City, Quarter..."></textarea>
                </div>

                @if (successMessage()) {
                  <div class="alert alert-success text-xs py-2 mt-2">
                    <span>{{ successMessage() }}</span>
                  </div>
                }

                <button type="submit" class="btn btn-primary w-full mt-4 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.91 1.445 5.493 3.693 7.19V22l3.376-1.854c.907.25 1.874.385 2.871.385 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.065 12.56l-2.612-2.79-5.097 2.79 5.61-5.955 2.613 2.79 5.096-2.79-5.61 5.955z"/>
                  </svg>
                  Checkout via Messenger
                </button>
              </form>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class ShoppingCartComponent {
  cartService = inject(CartService);

  fullName = '';
  phoneNumber = '';
  eventDate = '';
  deliveryAddress = '';
  successMessage = signal('');

  async checkoutToMessenger(event: Event) {
    event.preventDefault();

    let message = `🎈 *NEW POPART ORDER BOOKING* 🎈\n\n`;
    message += `👤 *Client Name:* ${this.fullName}\n`;
    message += `📞 *Phone:* ${this.phoneNumber}\n`;
    message += `📅 *Event Date:* ${this.eventDate}\n`;
    message += `📍 *Delivery Address:* ${this.deliveryAddress}\n\n`;
    message += `🛍️ *Order Items:*\n`;

    this.cartService.items().forEach((item: CartItem, index: number) => {
      const price = item.actionType === 'rent' ? item.product.rentalPrice : item.product.purchasePrice;
      message += `${index + 1}. *${item.product.title}* (${item.actionType.toUpperCase()})\n`;
      message += `   - Quantity: ${item.quantity}\n`;
      message += `   - Price: $${price} each\n`;
      message += `   - Image Ref: ${item.product.imageUrl}\n\n`;
    });

    message += `💰 *Estimated Total:* $${this.cartService.totalPrice()}\n`;
    message += `--- Please confirm my order!`;

    try {
      await navigator.clipboard.writeText(message);
      this.successMessage.set('Order copied to clipboard! Opening Facebook Messenger...');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    setTimeout(() => {
      window.open('https://m.me/61593938926480', '_blank');
    }, 1000);
  }
}