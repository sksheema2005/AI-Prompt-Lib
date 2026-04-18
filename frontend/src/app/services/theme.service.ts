import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Use signals for modern, reactive state management
  isDarkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');

  constructor() {
    // Automatically apply theme attribute and persist to localStorage
    effect(() => {
      const theme = this.isDarkMode() ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }
}
