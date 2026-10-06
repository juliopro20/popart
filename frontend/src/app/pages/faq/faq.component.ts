import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto space-y-8 py-8 px-4">
      <div class="text-center space-y-3">
        <span class="badge badge-primary badge-outline font-semibold uppercase">Help Center</span>
        <h1 class="text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
        <p class="text-base-content/70">Got questions about rentals, purchases, or checkout? We’ve got answers.</p>
      </div>

      <div class="space-y-4">
        <!-- FAQ Item 1 -->
        <div class="collapse collapse-plus bg-base-100 border border-base-200 shadow-sm">
          <input type="radio" name="faq-accordion" checked />
          <div class="collapse-title text-lg font-semibold">
            What is the difference between "Rent It" and "Buy It"?
          </div>
          <div class="collapse-content text-base-content/70 text-sm">
            <p><strong>Rent It</strong> allows you to lease our premium inflatable balloon arches or structures for your event duration (typically weekend rentals) at a fraction of the retail cost. <strong>Buy It</strong> is for purchasing items permanently for personal or repeated business use.</p>
          </div>
        </div>

        <!-- FAQ Item 2 -->
        <div class="collapse collapse-plus bg-base-100 border border-base-200 shadow-sm">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-lg font-semibold">
            How does the Facebook Messenger Checkout work?
          </div>
          <div class="collapse-content text-base-content/70 text-sm">
            <p>When you finish adding items to your cart and click checkout, our system automatically formats a complete order summary packet (including items, quantities, pricing, and image references) and copies it to your clipboard. It then opens our direct Facebook Messenger chat so you can simply paste and send your order instantly!</p>
          </div>
        </div>

        <!-- FAQ Item 3 -->
        <div class="collapse collapse-plus bg-base-100 border border-base-200 shadow-sm">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-lg font-semibold">
            How do I schedule a pickup or delivery for rentals?
          </div>
          <div class="collapse-content text-base-content/70 text-sm">
            <p>Once you send your order packet via Facebook Messenger, our support team will review item availability, confirm your event dates, and coordinate secure pickup or local drop-off arrangements with you.</p>
          </div>
        </div>

        <!-- FAQ Item 4 -->
        <div class="collapse collapse-plus bg-base-100 border border-base-200 shadow-sm">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-lg font-semibold">
            Can I request custom balloon arrangements or colors?
          </div>
          <div class="collapse-content text-base-content/70 text-sm">
            <p>Yes! We love bringing custom creative concepts to life. Reach out through our contact page or send us a direct message on Messenger with your theme or color palette.</p>
          </div>
        </div>
      </div>

      <!-- Support Prompt -->
      <div class="text-center bg-base-200/50 rounded-box p-6 border border-base-300 mt-8">
        <p class="text-sm text-base-content/70 mb-3">Still have a question that isn't answered here?</p>
        <a routerLink="/contact" class="btn btn-sm btn-primary text-white">Get in Touch</a>
      </div>
    </div>
  `,
})
export class FaqComponent {}