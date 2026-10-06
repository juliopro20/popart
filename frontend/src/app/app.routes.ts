import { Routes } from '@angular/router';
import { StoreLayoutComponent } from './layouts/store-layout.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { FavoriteItemsComponent } from './pages/favorite-items/favorite-items.component';
import { adminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './pages/dashboard/dashboard';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // Public store routes (Includes Header via StoreLayoutComponent)
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      { path: 'catalogue', title: 'Home - PopArt Inflatable Balloons', component: CatalogueComponent },
      { path: 'favorite-items', title: 'Favorite Items', component: FavoriteItemsComponent },
      { path: 'products/:id', title: 'Product Details', component: ProductDetailComponent },
      { path: 'shopping-cart', title: 'Shopping Cart', component: ShoppingCartComponent },
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
    ]
  },

  // Standalone Admin routes (NO store header or footer)
  { 
    path: 'admin/login', 
    title: 'Admin Login - PopArt', 
    component: AdminLoginComponent 
  },
  { 
    path: 'admin/dashboard', 
    title: 'Admin Dashboard - PopArt', 
    component: AdminDashboardComponent, 
    canActivate: [adminGuard] 
  },

  { path: '**', redirectTo: '' }
];