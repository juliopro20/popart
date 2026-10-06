import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { themeChange } from 'theme-change';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  template: `
    <router-outlet />
  `,
})
export class AppComponent implements OnInit {
  title = 'PopArt Inflatable Balloons';

  ngOnInit(): void {
    themeChange(false);
  }
}