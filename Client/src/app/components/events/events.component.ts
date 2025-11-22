import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event, EventStatus } from '../../models/models';
import { Dictionary } from '../../dictionary/dictionary';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  filter: 'all' | 'upcoming' | 'past' = 'all';
  selectedYear: number;
  currentYear = new Date().getFullYear();
  loading = false;
  readonly Dictionary = Dictionary;

  constructor(private eventService: EventService) {
    this.selectedYear = this.currentYear;
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getEventsByYear(this.selectedYear).subscribe({
      next: (events) => {
        this.events = events;
        this.filterEvents();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.loading = false;
      }
    });
  }

  setFilter(filter: 'all' | 'upcoming' | 'past'): void {
    this.filter = filter;
    this.filterEvents();
  }

  filterEvents(): void {
    this.loadEvents();
    
    if (this.filter === 'upcoming') {
      this.filteredEvents = this.events.filter(e => e.status === EventStatus.Upcoming);
    } else if (this.filter === 'past') {
      this.filteredEvents = this.events.filter(e => e.status === EventStatus.Completed);
    } else {
      this.filteredEvents = this.events;
    }
  }

  getStatusLabel(status: EventStatus): string {
    switch (status) {
      case EventStatus.Upcoming:
        return 'Upcoming';
      case EventStatus.Completed:
        return 'Completed';
      case EventStatus.Cancelled:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}
