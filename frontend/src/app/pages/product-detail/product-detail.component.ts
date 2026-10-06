import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faChevronLeft,
  faChevronRight,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton/product-card-skeleton.component';
import { Meta, Title } from '@angular/platform-browser';
import { FavoriteItemsLocalStorageService } from '../../services/favorite-items-local-storage.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    FontAwesomeModule,
    ProductCardComponent,
    ProductCardSkeletonComponent,
    FooterComponent,
    CommonModule,
  ],
  template: `
    <div class="min-h-full">
      <div class="mx-auto pt-24 pb-10 px-6 max-w-7xl">
        <div
          class="border-y border-y-base-300 flex gap-x-2 justify-between items-center py-2 mb-8"
        >
          <button (click)="router.navigate(['/'])" class="btn btn-ghost btn-sm">
            &larr; Back to Catalog
          </button>
          
          <div class="flex items-center gap-x-2">
            <button
              (click)="toggleFavoriteItem()"
              [class]="
                checkFavoriteItemAlreadyExist()
                  ? 'btn btn-soft btn-primary btn-md'
                  : 'btn btn-soft btn-md'
              "
            >
              <fa-icon [icon]="faHeart"></fa-icon> Favorite
            </button>
          </div>
        </div>

        <div
          class="flex flex-col-reverse lg:flex-row gap-y-10 justify-between gap-x-10"
        >
          <div class="w-full md:w-[60%]">
            @if (this.productResource.isLoading()) {
            <figure>
              <div class="w-full h-[350px] md:h-[550px] skeleton"></div>
            </figure>
            } @else {
            <figure>
              <img
                class="w-full h-[350px] md:h-[550px] object-cover rounded-box shadow-md"
                [src]="this.productResource.value()?.imageUrl"
                [alt]="this.productResource.value()?.title"
              />
            </figure>
            }
          </div>

          <div class="w-full md:w-[40%] flex flex-col justify-between">
            @if (this.productResource.isLoading()) {
            <div class="skeleton w-full h-[40px]"></div>
            <div class="skeleton w-[100px] mt-3 h-[20px]"></div>
            <div class="skeleton w-full mt-4 h-[150px]"></div>
            <div class="skeleton w-full mt-8 h-[50px]"></div>
            } @else {
              <div>
                <h2 class="text-3xl font-bold mb-3">
                  {{ this.productResource.value()?.title }}
                </h2>

                <div class="badge badge-outline capitalize mb-4">
                  {{ this.productResource.value()?.category }}
                </div>

                <!-- Dual Pricing Display -->
                <div class="grid grid-cols-2 gap-4 p-4 bg-base-200 rounded-box my-4">
                  <div>
                    <span class="text-xs text-gray-400 block font-semibold uppercase">Rental Price</span>
                    <span class="text-2xl font-bold text-primary">\${{ this.productResource.value()?.rentalPrice }}</span>
                  </div>
                  <div class="border-l pl-4">
                    <span class="text-xs text-gray-400 block font-semibold uppercase">Purchase Price</span>
                    <span class="text-2xl font-bold text-secondary">\${{ this.productResource.value()?.purchasePrice }}</span>
                  </div>
                </div>

                <!-- Acquisition Mode Toggle -->
                <div class="form-control w-full my-4">
                  <label class="label">
                    <span class="label-text font-semibold">Select Option:</span>
                  </label>
                  <div class="join w-full">
                    <button 
                      type="button" 
                      class="join-item btn flex-1"
                      [class.btn-active]="selectedType() === 'rent'"
                      [class.btn-primary]="selectedType() === 'rent'"
                      (click)="selectedType.set('rent')"
                    >
                      Rent It (\${{ this.productResource.value()?.rentalPrice }})
                    </button>
                    <button 
                      type="button" 
                      class="join-item btn flex-1"
                      [class.btn-active]="selectedType() === 'purchase'"
                      [class.btn-secondary]="selectedType() === 'purchase'"
                      (click)="selectedType.set('purchase')"
                    >
                      Buy It (\${{ this.productResource.value()?.purchasePrice }})
                    </button>
                  </div>
                </div>

                <p class="leading-relaxed mt-4 text-base-content/80">
                  {{ this.productResource.value()?.description }}
                </p>
              </div>

              <button
                [disabled]="checkItemAlreadyExist()"
                (click)="addItem()"
                class="w-full btn btn-primary mt-8 btn-lg"
              >
                <fa-icon [icon]="faCartShopping"></fa-icon>
                {{ checkItemAlreadyExist() ? 'Already in Cart' : 'Add to Cart' }}
              </button>
            }
          </div>
        </div>
      </div>

      <div class="mx-auto pt-16 pb-10 px-6 max-w-7xl">
        <div class="mt-10">
          <h3 class="text-2xl font-bold mb-8">Other PopArt Inflatables</h3>
          @if (isLoadingSimilarProductResource()) {
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
          >
            @for (item of [1,2,3,4]; track item) {
            <app-product-card-skeleton />
            }
          </div>
          } @else {
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
          >
            @for (similarProduct of similarProductResource.value(); track
            similarProduct._id || similarProduct.id) {
            <app-product-card [product]="similarProduct" />
            }
          </div>
          }
        </div>
      </div>
    </div>
    <app-footer />
  `,
  styles: ``,
})
export class ProductDetailComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Product Details - PopArt Inflatable Balloons');
    this.meta.updateTag({
      name: 'description',
      content: 'Browse rental and purchase pricing for premium event inflatables with PopArt Inflatable Balloons.',
    });
  }

  faCartShopping = faCartShopping;
  faHeart = faHeart;

  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );
  private readonly favoriteItemsLocalStorageService = inject(
    FavoriteItemsLocalStorageService
  );

  productId = signal<string>('');
  selectedType = signal<'rent' | 'purchase'>('rent');

  productResource = resource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => this.apiService.getProductById(request.id),
  });

  similarProductResource = resource({
    request: () => ({ category: this.productResource.value()?.category }),
    loader: ({ request }) =>
      this.apiService.getProductsWithLimit(4, request.category),
  });

  isLoading = computed(() => this.productResource.isLoading());
  isLoadingSimilarProductResource = computed(() =>
    this.similarProductResource.isLoading()
  );

  errorEffect = effect(() => {
    const error = this.productResource.error() as Error;
    if (error) {
      console.error(error);
    }
  });

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) this.productId.set(id);
    });
  }

  getCurrentId(): string {
    const p = this.productResource.value();
    return p?._id || (p?.id as string) || this.productId();
  }

  checkItemAlreadyExist() {
    return this.shoppingCartLocalStorageService.checkItemAlreadyExist(
      this.getCurrentId()
    );
  }

  addItem() {
    const p = this.productResource.value();
    if (!p) return;

    const chosenPrice = this.selectedType() === 'rent' ? p.rentalPrice : p.purchasePrice;

    this.shoppingCartLocalStorageService.addItem({
      ...p,
      quantity: 1,
      selectedAcquisitionType: this.selectedType(),
      selectedPrice: chosenPrice,
    });
  }

  checkFavoriteItemAlreadyExist() {
    return this.favoriteItemsLocalStorageService.checkItemAlreadyExist(
      this.getCurrentId()
    );
  }

  toggleFavoriteItem() {
    const p = this.productResource.value();
    if (!p) return;
    if (this.checkFavoriteItemAlreadyExist()) {
      this.favoriteItemsLocalStorageService.removeItem(p);
    } else {
      this.favoriteItemsLocalStorageService.addItem(p);
    }
  }
}