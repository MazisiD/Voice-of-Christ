import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Highlight } from '../models/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  constructor(private localStorageService: LocalStorageService) {}

  getHighlights(): Observable<Highlight[]> {
    const highlights = this.localStorageService.getHighlights();
    return of(highlights).pipe(delay(100));
  }

  getActiveHighlights(): Observable<Highlight[]> {
    const highlights = this.localStorageService.getHighlights()
      .filter(h => h.isActive)
      .sort((a, b) => a.orderIndex - b.orderIndex);
    return of(highlights).pipe(delay(100));
  }

  getHighlightById(id: number): Observable<Highlight | undefined> {
    const highlight = this.localStorageService.getHighlights().find(h => h.id === id);
    return of(highlight).pipe(delay(100));
  }

  addHighlight(highlight: Highlight): Observable<Highlight> {
    this.localStorageService.addHighlight(highlight);
    return of(highlight).pipe(delay(100));
  }

  updateHighlight(highlight: Highlight): Observable<Highlight> {
    this.localStorageService.updateHighlight(highlight);
    return of(highlight).pipe(delay(100));
  }

  deleteHighlight(id: number): Observable<void> {
    this.localStorageService.deleteHighlight(id);
    return of(void 0).pipe(delay(100));
  }
}
