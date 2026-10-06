import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartLocalStorageService {
  private readonly key = 'ng_e_commerce_cart_items';

  cartItems = signal<Product[]>(this.loadItems());
  cartItemQuantity = computed(() => {
    return this.cartItems().reduce((a, c) => {
      a += c?.quantity!;
      return a;
    }, 0);
  });

  private loadItems(): Product[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private saveItems(items: Product[]) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.cartItems.set(items); // Update the signal
  }

  addItem(item: Product) {
    const items = [...this.cartItems()];
    items.push(item);
    this.saveItems(items);
  }

  removeItem(item: Product) {
    const targetId = item._id || item.id;
    const newItems = this.cartItems().filter((i) => (i._id || i.id) !== targetId);
    this.saveItems(newItems);
  }

  updateItem(item: Product) {
    const targetId = item._id || item.id;
    const newItems = this.cartItems().map((i) => {
      if ((i._id || i.id) !== targetId) {
        return i;
      } else {
        return item;
      }
    });
    this.saveItems(newItems);
  }

  clearItems() {
    localStorage.removeItem(this.key);
    this.cartItems.set([]);
  }

  checkItemAlreadyExist(id: string | number) {
    return this.cartItems().some((ct) => (ct._id === id || ct.id === id));
  }
}