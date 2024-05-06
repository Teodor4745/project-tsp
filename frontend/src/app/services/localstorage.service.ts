import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorage: Storage|null = null;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = this.document.defaultView!.localStorage;
    }
  }

  // Set a value in local storage
  setItem(key: string, value: string): void {
    if (this.localStorage) {
      this.localStorage.setItem(key, value);
    }
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    if (this.localStorage) {
      return this.localStorage.getItem(key);
    }
    return null;
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    if (this.localStorage) {
      this.localStorage.removeItem(key);
    }
  }

  // Clear all items from local storage
  clear(): void {
    if (this.localStorage) {
      this.localStorage.clear();
    }
  }
}
