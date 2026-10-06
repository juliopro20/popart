import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto space-y-12 py-8 px-4">
      <!-- Header Banner -->
      <div class="text-center space-y-4">
        <span class="badge badge-secondary badge-outline font-semibold uppercase">Our Story</span>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
          Crafting Unforgettable Moments with <span class="text-primary">PopArt</span>
        </h1>
        <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
          We bring creativity, color, and grandeur to celebrations through exceptional inflatable balloon designs and event structures.
        </p>
      </div>

      <!-- Main Image / Showcase Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">Who We Are</h3>
          <p class="text-base-content/80 leading-relaxed">
            Founded with a passion for vibrant celebration design, <strong>PopArt Inflatable Balloons</strong> specializes in transforming ordinary spaces into extraordinary visual experiences. Whether it's a grand birthday arch, a corporate ribbon-cutting ceremony, or a wedding reception, our customized inflatables deliver unmatched aesthetic appeal.
          </p>
          <p class="text-base-content/80 leading-relaxed">
            We provide flexible options—allowing clients to <strong>rent</strong> premium pieces for weekend events or <strong>buy</strong> unique items outright, ensuring every celebration matches your exact vision and budget.
          </p>
        </div>
        <div class="bg-base-200 rounded-box h-[320px] flex items-center justify-center border border-base-300 shadow-inner">
          <div class="text-center p-6">
            <span class="text-6xl block mb-2">🎨🎈</span>
            <span class="font-bold text-lg text-base-content/60">PopArt Creative Studio</span>
          </div>
        </div>
      </div>

      <!-- Mission / Vision Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-100 border border-base-200 shadow-sm p-6">
          <h4 class="text-xl font-bold mb-2 text-primary">Our Mission</h4>
          <p class="text-base-content/70 text-sm leading-relaxed">
            To elevate everyday event styling across the region by delivering innovative, hassle-free inflatable rentals and purchases backed by seamless digital customer service.
          </p>
        </div>
        <div class="card bg-base-100 border border-base-200 shadow-sm p-6">
          <h4 class="text-xl font-bold mb-2 text-secondary">Why Choose Us</h4>
          <p class="text-base-content/70 text-sm leading-relaxed">
            From our dual-pricing structure to our lightning-fast Facebook Messenger checkout workflow, we put convenience and client satisfaction at the heart of everything we do.
          </p>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center bg-base-200/50 rounded-box p-8 border border-base-300">
        <h3 class="text-2xl font-bold mb-2">Ready to plan your next event?</h3>
        <p class="text-base-content/70 mb-6">Explore our catalog or reach out directly to discuss custom requests.</p>
        <div class="flex justify-center gap-4">
          <a routerLink="/products" class="btn btn-primary text-white">Explore Catalog</a>
          <a routerLink="/contact" class="btn btn-outline">Contact Us</a>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {}