import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Testimony } from '../models/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonyService {

  constructor(private localStorage: LocalStorageService) {}

  getApprovedTestimonies(): Observable<Testimony[]> {
    const testimonies = this.localStorage.getTestimonies()
      .filter(t => t.isApproved)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return of(testimonies).pipe(delay(100));
  }

  getAllTestimonies(): Observable<Testimony[]> {
    const testimonies = this.localStorage.getTestimonies()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return of(testimonies).pipe(delay(100));
  }

  getTestimony(id: number): Observable<Testimony | undefined> {
    const testimonies = this.localStorage.getTestimonies();
    const testimony = testimonies.find(t => t.id === id);
    return of(testimony).pipe(delay(100));
  }

  addTestimony(testimony: Omit<Testimony, 'id' | 'createdAt'>): Observable<Testimony> {
    const newTestimony: Testimony = {
      ...testimony,
      id: Date.now(),
      createdAt: new Date()
    };
    this.localStorage.addTestimony(newTestimony);
    return of(newTestimony).pipe(delay(100));
  }

  updateTestimony(id: number, testimony: Partial<Testimony>): Observable<Testimony | null> {
    const updated = this.localStorage.updateTestimony(id, testimony);
    return of(updated).pipe(delay(100));
  }

  deleteTestimony(id: number): Observable<boolean> {
    const result = this.localStorage.deleteTestimony(id);
    return of(result).pipe(delay(100));
  }

  approveTestimony(id: number): Observable<Testimony | null> {
    return this.updateTestimony(id, { isApproved: true });
  }
}
