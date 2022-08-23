import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  async copy(text: string) {
    await navigator.clipboard.writeText(text)
  }
}
