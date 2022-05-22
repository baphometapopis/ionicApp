import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async setString(key: string, value: string) {
    await Storage.set({ key, value });
  }

  async getString(key: string): Promise<{ value: any }> {
    return await Storage.get({ key });
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async clear() {
    await Storage.clear();
  }

  name() {
    return this.getString('user_name');
  }
  email() {
    return this.getString('user_email');
  }
}
