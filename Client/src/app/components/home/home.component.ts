import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { HighlightService } from '../../services/highlight.service';
import { ChurchInfoService } from '../../services/church-info.service';
import { Event, Highlight, HighlightType, ChurchInfo } from '../../models/models';
import { Dictionary } from '../../dictionary/dictionary';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  upcomingEvents: Event[] = [];
  highlights: Highlight[] = [];
  churchInfo: ChurchInfo | null = null;
  readonly Dictionary = Dictionary;
  readonly HighlightType = HighlightType;

  constructor(
    private eventService: EventService,
    private highlightService: HighlightService,
    private churchInfoService: ChurchInfoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.eventService.getUpcomingEvents().subscribe({
      next: (events) => {
        this.upcomingEvents = events.slice(0, 3);
      },
      error: (error) => console.error('Error loading events:', error)
    });

    this.highlightService.getActiveHighlights().subscribe({
      next: (highlights) => {
        this.highlights = highlights;
      },
      error: (error) => console.error('Error loading highlights:', error)
    });

    this.churchInfoService.getChurchInfo().subscribe({
      next: (info) => {
        this.churchInfo = info;
      },
      error: (error) => console.error('Error loading church info:', error)
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
