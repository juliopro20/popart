import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div class="max-w-md w-full bg-base-100 rounded-box shadow-lg p-8 border border-base-300">
        <div class="mb-6">
          <a routerLink="/" class="btn btn-ghost btn-sm gap-2 mb-4">
            <fa-icon [icon]="faArrowLeft"></fa-icon> Back to Store
          </a>
          <h1 class="text-2xl font-bold text-center">Admin Portal Login</h1>
          <p class="text-sm text-base-content/70 text-center mt-1">PopArt Inflatable Balloons Management</p>
        </div>

        @if (errorMessage()) {
          <div class="alert alert-error mb-4 text-sm py-2">
            <span>{{ errorMessage() }}</span>
          </div>
        }

        <form (submit)="onLogin($event)" class="space-y-4">
          <div>
            <label class="label font-medium">Email Address</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                <fa-icon [icon]="faEnvelope"></fa-icon>
              </span>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                class="input input-bordered w-full pl-10"
                placeholder="admin@popart.com"
              />
            </div>
          </div>

          <div>
            <label class="label font-medium">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                <fa-icon [icon]="faLock"></fa-icon>
              </span>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                required
                class="input input-bordered w-full pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-full mt-2" [disabled]="isLoading()">
            @if (isLoading()) {
              <span class="loading loading-spinner"></span>
            }
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``
})
export class AdminLoginComponent {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  faLock = faLock;
  faEnvelope = faEnvelope;
  faArrowLeft = faArrowLeft;

  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  async onLogin(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);
    this.errorMessage.set('');

    const res = await this.apiService.loginAdmin({
      email: this.email,
      password: this.password
    });

    this.isLoading.set(false);

    if (res && res.token) {
      localStorage.setItem('popart_admin_token', res.token);
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage.set('Invalid credentials or connection error.');
    }
  }
}