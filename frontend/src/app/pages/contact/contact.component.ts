import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ FormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-10 py-8 px-4">
      <div class="text-center space-y-3">
        <span class="badge badge-secondary badge-outline font-semibold uppercase">Get in Touch</span>
        <h1 class="text-4xl font-extrabold tracking-tight">We'd Love to Hear From You</h1>
        <p class="text-base-content/70">Have questions about an inflatable rental or need a custom quote? Drop us a message!</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Contact Info Cards -->
        <div class="space-y-4 md:col-span-1">
          <div class="card bg-base-100 border border-base-200 shadow-sm p-6 space-y-2">
            <div class="text-2xl">💬</div>
            <h3 class="font-bold text-lg">Messenger Chat</h3>
            <p class="text-sm text-base-content/70">Fastest response for active orders and quick questions.</p>
            <a href="https://m.me/61593938926480" target="_blank" class="btn btn-sm btn-primary text-white w-full mt-2">Open Messenger</a>
          </div>

          <div class="card bg-base-100 border border-base-200 shadow-sm p-6 space-y-2">
            <div class="text-2xl">📍</div>
            <h3 class="font-bold text-lg">Location</h3>
            <p class="text-sm text-base-content/70">Proudly serving local celebrations and events across Cameroon.</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card bg-base-100 border border-base-200 shadow-sm p-6 md:col-span-2">
          @if (submitted()) {
            <div class="alert alert-success shadow-sm">
              <span>🎉 Thank you! Your message has been prepared. We'll get back to you shortly.</span>
            </div>
          } @else {
            <form (submit)="onSubmit($event)" class="space-y-4">
              <h3 class="text-xl font-bold mb-4">Send Us a Message</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label"><span class="label-text font-medium">Your Name</span></label>
                  <input type="text" placeholder="John Doe" class="input input-bordered w-full" required />
                </div>
                <div class="form-control">
                  <label class="label"><span class="label-text font-medium">Email / Contact</span></label>
                  <input type="text" placeholder="name@example.com" class="input input-bordered w-full" required />
                </div>
              </div>

              <div class="form-control">
                <label class="label"><span class="label-text font-medium">Subject / Event Type</span></label>
                <input type="text" placeholder="Birthday Arch Rental Inquiry" class="input input-bordered w-full" required />
              </div>

              <div class="form-control">
                <label class="label"><span class="label-text font-medium">Message</span></label>
                <textarea rows="4" placeholder="Tell us about your event date and balloon preferences..." class="textarea textarea-bordered w-full" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary text-white w-full mt-2">
                Send Inquiry
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  submitted = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
  }
}