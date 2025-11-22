import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Event, EventStatus } from '../models/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private localStorage: LocalStorageService) { }

  getEvents(): Observable<Event[]> {
    const events = this.localStorage.getEvents();
    const branches = this.localStorage.getBranches();
    
    // Attach branch info to events
    const eventsWithBranches = events.map(event => ({
      ...event,
      branch: event.branchId ? branches.find(b => b.id === event.branchId) : undefined
    }));
    
    return of(eventsWithBranches).pipe(delay(100));
  }

  getUpcomingEvents(): Observable<Event[]> {
    const events = this.localStorage.getEvents();
    const branches = this.localStorage.getBranches();
    const now = new Date();
    
    const upcomingEvents = events
      .filter(e => e.status === EventStatus.Upcoming && new Date(e.eventDate) >= now)
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
      .map(event => ({
        ...event,
        branch: event.branchId ? branches.find(b => b.id === event.branchId) : undefined
      }));
    
    return of(upcomingEvents).pipe(delay(100));
  }

  getPastEvents(): Observable<Event[]> {
    const events = this.localStorage.getEvents();
    const branches = this.localStorage.getBranches();
    const now = new Date();
    
    const pastEvents = events
      .filter(e => e.status === EventStatus.Completed || new Date(e.eventDate) < now)
      .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
      .map(event => ({
        ...event,
        branch: event.branchId ? branches.find(b => b.id === event.branchId) : undefined
      }));
    
    return of(pastEvents).pipe(delay(100));
  }

  getEventsByYear(year: number): Observable<Event[]> {
    const events = this.localStorage.getEvents();
    const branches = this.localStorage.getBranches();
    
    const yearEvents = events
      .filter(e => new Date(e.eventDate).getFullYear() === year)
      .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
      .map(event => ({
        ...event,
        branch: event.branchId ? branches.find(b => b.id === event.branchId) : undefined
      }));
    
    return of(yearEvents).pipe(delay(100));
  }

  getEvent(id: number): Observable<Event> {
    const events = this.localStorage.getEvents();
    const branches = this.localStorage.getBranches();
    const event = events.find(e => e.id === id);
    
    if (event) {
      const eventWithBranch = {
        ...event,
        branch: event.branchId ? branches.find(b => b.id === event.branchId) : undefined
      };
      return of(eventWithBranch).pipe(delay(100));
    }
    
    throw new Error('Event not found');
  }

  createEvent(event: Event): Observable<Event> {
    const newEvent = this.localStorage.addEvent(event);
    return of(newEvent).pipe(delay(100));
  }

  updateEvent(id: number, event: Event): Observable<void> {
    this.localStorage.updateEvent(id, event);
    return of(void 0).pipe(delay(100));
  }

  deleteEvent(id: number): Observable<void> {
    this.localStorage.deleteEvent(id);
    return of(void 0).pipe(delay(100));
  }
}
