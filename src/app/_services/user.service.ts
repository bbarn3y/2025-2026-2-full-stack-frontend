import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly STORAGE_KEY = 'sessionToken';

  private readonly _token = signal<string | null>(this.readTokenFromStorage());

  readonly token = this._token.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token());

  removeToken(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._token.set(null);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
    this._token.set(token);
  }

  private readTokenFromStorage(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }
}
