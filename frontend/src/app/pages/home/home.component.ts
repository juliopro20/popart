import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../type';
import { FooterComponent } from '../../components/footer/footer.component';
// Import your product service here to fetch products if applicable

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,FooterComponent],
  template: `
    <div class="space-y-12 pb-16">
      <!-- Hero Section -->
      <div class="hero min-h-[450px] rounded-box bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 md:p-12 shadow-inner">
        <div class="hero-content text-center">
          <div class="max-w-2xl">
            <span class="badge badge-primary badge-outline h-15 mb-4 font-semibold uppercase tracking-wider">🎉 Ultimate Party & Event Rentals</span>
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight">
              PopArt Inflatable <span class="text-primary">Balloons</span>
            </h1>
            <p class="py-6 text-base-content/80 text-lg">
              Transform your birthdays, weddings, and corporate celebrations with breathtaking inflatable arches, custom balloon designs, and premium event rentals. Rent or Buy today!
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <a routerLink="/catalogue" class="btn btn-primary btn-lg text-white shadow-md">
                Browse Collection
              </a>
              <a routerLink="/contact" class="btn btn-outline btn-lg">
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features / Value Proposition -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div class="card bg-base-100 shadow-sm border border-base-200 p-6 text-center">
          <div class="text-4xl mb-2">🎈</div>
          <h3 class="font-bold text-lg mb-1">Dual Pricing Flexibility</h3>
          <p class="text-sm text-base-content/70">Choose whether you want to rent statement pieces for a weekend or buy them for permanent displays.</p>
        </div>
        <div class="card bg-base-100 shadow-sm border border-base-200 p-6 text-center">
          <div class="text-4xl mb-2">⚡</div>
          <h3 class="font-bold text-lg mb-1">Instant Messenger Checkout</h3>
          <p class="text-sm text-base-content/70">Build your cart, auto-copy your structured order packet, and chat with us directly on Messenger instantly.</p>
        </div>
        <div class="card bg-base-100 shadow-sm border border-base-200 p-6 text-center">
          <div class="text-4xl mb-2">🌟</div>
          <h3 class="font-bold text-lg mb-1">Premium Quality</h3>
          <p class="text-sm text-base-content/70">Professionally styled, durable materials guaranteed to make your event unforgettable.</p>
        </div>
      </div>

      <!-- Featured Section Callout -->
      <div class="flex justify-between items-center px-4">
        <div>
          <h2 class="text-2xl font-bold">Featured Attractions</h2>
          <p class="text-sm text-base-content/70">Check out our most popular arches and party inflatables.</p>
        </div>
        <a routerLink="/products" class="btn btn-ghost btn-sm font-semibold text-primary">View All →</a>
      </div>
    </div>

    <app-footer></app-footer>
  `,
})
export class HomeComponent {}