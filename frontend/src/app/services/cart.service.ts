import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../type';

export interface CartItem {
  product: Product;
  quantity: number;
  actionType: 'rent' | 'buy';
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<CartItem[]>([]);

  totalCount = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));
  
  totalPrice = computed(() => this.items().reduce((acc, item) => {
    const price = item.actionType === 'rent' ? (item.product.rentalPrice || 0) : (item.product.purchasePrice || 0);
    return acc + (price * item.quantity);
  }, 0));

  addItem(product: Product, actionType: 'rent' | 'buy') {
    const currentItems = this.items();
    const existingIndex = currentItems.findIndex(
      i => i.product._id === product._id && i.actionType === actionType
    );

    if (existingIndex > -1) {
      const updated = [...currentItems];
      updated[existingIndex].quantity += 1;
      this.items.set(updated);
    } else {
      this.items.set([...currentItems, { product, quantity: 1, actionType }]);
    }
  }

  updateQuantity(productId: string, actionType: 'rent' | 'buy', quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId, actionType);
      return;
    }
    this.items.update(items =>
      items.map(item => 
        (item.product._id === productId && item.actionType === actionType) 
          ? { ...item, quantity } 
          : item
      )
    );
  }

  removeItem(productId: string, actionType: 'rent' | 'buy') {
    this.items.update(items => 
      items.filter(item => !(item.product._id === productId && item.actionType === actionType))
    );
  }

  clearCart() {
    this.items.set([]);
  }
}