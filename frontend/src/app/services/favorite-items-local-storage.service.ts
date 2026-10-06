import { Injectable, signal } from '@angular/core';
import { Product } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class FavoriteItemsLocalStorageService {
  private readonly key = 'popart_favorite_items';

  favoriteItems = signal<Product[]>(this.loadItems());

  private loadItems(): Product[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private saveItems(items: Product[]) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.favoriteItems.set(items);
  }

  addItem(item: Product) {
    const items = [...this.favoriteItems()];
    items.push(item);
    this.saveItems(items);
  }

  removeItem(item: Product) {
    const itemId = item._id || item.id;
    const newItems = this.favoriteItems().filter((i) => (i._id || i.id) !== itemId);
    this.saveItems(newItems);
  }

  updateItem(item: Product) {
    const itemId = item._id || item.id;
    const newItems = this.favoriteItems().map((i) => {
      if ((i._id || i.id) !== itemId) {
        return i;
      } else {
        return item;
      }
    });
    this.saveItems(newItems);
  }

  clearItems() {
    localStorage.removeItem(this.key);
    this.favoriteItems.set([]);
  }

  checkItemAlreadyExist(id: string | number) {
    return this.favoriteItems().some((ct) => (ct._id === id || ct.id === id));
  }
}