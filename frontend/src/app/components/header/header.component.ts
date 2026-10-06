import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faHamburger,
  faHeart,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  template: `
    <header
      class="w-full py-4 top-0 fixed bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 z-50 border-b border-b-base-300"
    >
      <div class="max-w-7xl px-4 sm:px-6 mx-auto flex items-center justify-between">
        <div class="flex items-center gap-x-3 sm:gap-x-5">
          <a
            class="flex items-center gap-x-2 sm:gap-x-3 text-lg sm:text-xl font-bold btn btn-ghost group px-2"
            routerLink="/"
          >
            <fa-icon
              class="group-hover:text-primary"
              [icon]="faShoppingBag"
            ></fa-icon>
            <span>PopArt</span>
          </a>
          <div class="items-center gap-x-4 hidden lg:flex">
            <a
              routerLink="/catalogue"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all font-medium"
              >Catalogue</a
            >
            <a
              routerLink="/faq"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all font-medium"
              >FAQ</a
            >
            <a
              routerLink="/about"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all font-medium"
              >About</a
            >
            <a
              routerLink="/contact"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              class="hover:underline transition-all font-medium"
              >Contact</a
            >
          </div>
        </div>
        <div class="hidden lg:flex items-center gap-x-2">
          <a
            routerLink="/favorite-items"
            class="btn btn-ghost"
            routerLinkActive="bg-primary text-white"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <fa-icon [icon]="faHeart"></fa-icon>
          </a>
          <a
            routerLink="/shopping-cart"
            class="btn btn-ghost relative"
            routerLinkActive="bg-primary text-white"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <fa-icon [icon]="faCartShopping"></fa-icon>
            @if (cartItemQuantity() >= 1) {
            <div class="absolute -top-2 -right-2 badge badge-primary badge-sm">
              {{ cartItemQuantity() }}
            </div>
            }
          </a>
          <select data-choose-theme class="select select-bordered select-sm">
            <option value="dark">Default</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div class="block lg:hidden dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            <fa-icon [icon]="faHamburger"></fa-icon>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border border-base-200"
          >
            <li>
              <a
                routerLink="/"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >All</a
              >
            </li>
            <li>
              <a
                routerLink="/faq"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >FAQ</a
              >
            </li>
            <li>
              <a
                routerLink="/about"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >About</a
              >
            </li>
            <li>
              <a
                routerLink="/contact"
                routerLinkActive="active-link"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >Contact</a
              >
            </li>
            <li>
              <a
                routerLink="/favorite-items"
                routerLinkActive="bg-primary text-white"
                [routerLinkActiveOptions]="{ exact: true }"
                class="hover:underline transition-all"
                >Favorite</a
              >
            </li>
            <li>
              <a
                routerLink="/shopping-cart"
                routerLinkActive="bg-primary text-white"
                [routerLinkActiveOptions]="{ exact: true }"
                class="relative hover:underline transition-all"
                >Shopping Cart @if (cartItemQuantity() >= 1) {
                <div
                  class="absolute top-2 right-2 badge badge-primary badge-sm"
                >
                  {{ cartItemQuantity() }}
                </div>
                }
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  `,
  styles: `
    .active-link {
      color: hsl(var(--p));
      font-weight: 600;
      text-decoration: underline;
    }
  `,
})
export class HeaderComponent {
  private readonly cartService = inject(CartService);

  faCartShopping = faCartShopping;
  faShoppingBag = faShoppingBag;
  faHamburger = faHamburger;
  faHeart = faHeart;

  cartItemQuantity = computed(() => this.cartService.totalCount());
}