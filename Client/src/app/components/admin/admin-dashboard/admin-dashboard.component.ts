import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../../services/branch.service';
import { PastorService } from '../../../services/pastor.service';
import { EventService } from '../../../services/event.service';
import { ChurchInfoService } from '../../../services/church-info.service';
import { HighlightService } from '../../../services/highlight.service';
import { TestimonyService } from '../../../services/testimony.service';
import { Branch, Pastor, Event, ChurchInfo, EventType, EventStatus, Highlight, HighlightType, Testimony } from '../../../models/models';
import { Dictionary } from '../../../dictionary/dictionary';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'branches' | 'pastors' | 'events' | 'churchinfo' | 'highlights' | 'testimonies' = 'branches';
  readonly Dictionary = Dictionary;
  readonly HighlightType = HighlightType;
  
  // Data
  branches: Branch[] = [];
  pastors: Pastor[] = [];
  events: Event[] = [];
  churchInfo: ChurchInfo | null = null;
  highlights: Highlight[] = [];
  testimonies: Testimony[] = [];
  
  // Forms
  branchForm: Partial<Branch> = {};
  pastorForm: Partial<Pastor> = {};
  eventForm: Partial<Event> = {};
  highlightForm: Partial<Highlight> = {};
  
  // Edit modes
  editingBranch: Branch | null = null;
  editingPastor: Pastor | null = null;
  editingEvent: Event | null = null;
  editingHighlight: Highlight | null = null;
  
  // Event types and statuses
  eventTypes = Object.keys(EventType).filter(k => isNaN(Number(k)));
  eventStatuses = Object.keys(EventStatus).filter(k => isNaN(Number(k)));
  highlightTypes = Object.keys(HighlightType).filter(k => isNaN(Number(k)));

  constructor(
    private branchService: BranchService,
    private pastorService: PastorService,
    private eventService: EventService,
    private churchInfoService: ChurchInfoService,
    private highlightService: HighlightService,
    private testimonyService: TestimonyService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loadBranches();
    this.loadPastors();
    this.loadEvents();
    this.loadChurchInfo();
    this.loadHighlights();
    this.loadTestimonies();
  }

  // Branch operations
  loadBranches(): void {
    this.branchService.getBranches().subscribe(branches => this.branches = branches);
  }

  saveBranch(): void {
    if (this.editingBranch) {
      this.branchService.updateBranch(this.editingBranch.id, this.branchForm as Branch).subscribe(() => {
        this.loadBranches();
        this.cancelBranchEdit();
      });
    } else {
      this.branchService.createBranch(this.branchForm as Branch).subscribe(() => {
        this.loadBranches();
        this.branchForm = {};
      });
    }
  }

  editBranch(branch: Branch): void {
    this.editingBranch = branch;
    this.branchForm = { ...branch };
  }

  cancelBranchEdit(): void {
    this.editingBranch = null;
    this.branchForm = {};
  }

  deleteBranch(id: number): void {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.branchService.deleteBranch(id).subscribe(() => this.loadBranches());
    }
  }

  // Pastor operations
  loadPastors(): void {
    this.pastorService.getPastors().subscribe(pastors => this.pastors = pastors);
  }

  savePastor(): void {
    if (this.editingPastor) {
      this.pastorService.updatePastor(this.editingPastor.id, this.pastorForm as Pastor).subscribe(() => {
        this.loadPastors();
        this.cancelPastorEdit();
      });
    } else {
      this.pastorService.createPastor(this.pastorForm as Pastor).subscribe(() => {
        this.loadPastors();
        this.pastorForm = {};
      });
    }
  }

  editPastor(pastor: Pastor): void {
    this.editingPastor = pastor;
    this.pastorForm = { ...pastor };
  }

  cancelPastorEdit(): void {
    this.editingPastor = null;
    this.pastorForm = {};
  }

  deletePastor(id: number): void {
    if (confirm('Are you sure you want to delete this pastor?')) {
      this.pastorService.deletePastor(id).subscribe(() => this.loadPastors());
    }
  }

  // Event operations
  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  saveEvent(): void {
    if (this.editingEvent) {
      this.eventService.updateEvent(this.editingEvent.id, this.eventForm as Event).subscribe(() => {
        this.loadEvents();
        this.cancelEventEdit();
      });
    } else {
      this.eventService.createEvent(this.eventForm as Event).subscribe(() => {
        this.loadEvents();
        this.eventForm = {};
      });
    }
  }

  editEvent(event: Event): void {
    this.editingEvent = event;
    this.eventForm = { ...event };
  }

  cancelEventEdit(): void {
    this.editingEvent = null;
    this.eventForm = {};
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => this.loadEvents());
    }
  }

  // Church Info operations
  loadChurchInfo(): void {
    this.churchInfoService.getChurchInfo().subscribe(info => this.churchInfo = info);
  }

  saveChurchInfo(): void {
    if (this.churchInfo) {
      this.churchInfoService.updateChurchInfo(this.churchInfo.id, this.churchInfo).subscribe(() => {
        alert('Church information updated successfully!');
        this.loadChurchInfo();
      });
    }
  }

  // Highlight operations
  loadHighlights(): void {
    this.highlightService.getHighlights().subscribe(highlights => this.highlights = highlights);
  }

  saveHighlight(): void {
    if (this.editingHighlight) {
      this.highlightService.updateHighlight(this.highlightForm as Highlight).subscribe(() => {
        alert('Highlight updated successfully!');
        this.loadHighlights();
        this.highlightForm = {};
        this.editingHighlight = null;
      });
    } else {
      const newHighlight: Highlight = {
        ...this.highlightForm as Highlight,
        id: 0,
        isActive: this.highlightForm.isActive ?? true,
        createdAt: new Date()
      };
      this.highlightService.addHighlight(newHighlight).subscribe(() => {
        alert('Highlight added successfully!');
        this.loadHighlights();
        this.highlightForm = {};
      });
    }
  }

  editHighlight(highlight: Highlight): void {
    this.editingHighlight = highlight;
    this.highlightForm = { ...highlight };
  }

  cancelHighlightEdit(): void {
    this.editingHighlight = null;
    this.highlightForm = {};
  }

  deleteHighlight(id: number): void {
    if (confirm(Dictionary.ADMIN_DELETE_CONFIRM_HIGHLIGHT)) {
      this.highlightService.deleteHighlight(id).subscribe(() => this.loadHighlights());
    }
  }

  // Testimony operations
  loadTestimonies(): void {
    this.testimonyService.getAllTestimonies().subscribe(testimonies => this.testimonies = testimonies);
  }

  approveTestimony(id: number): void {
    this.testimonyService.approveTestimony(id).subscribe(() => {
      alert('Testimony approved successfully!');
      this.loadTestimonies();
    });
  }

  deleteTestimony(id: number): void {
    if (confirm('Are you sure you want to delete this testimony?')) {
      this.testimonyService.deleteTestimony(id).subscribe(() => this.loadTestimonies());
    }
  }

  getStatusLabel(status: EventStatus): string {
    return this.eventStatuses[status];
  }
}
