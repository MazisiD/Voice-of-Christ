import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestimonyService } from '../../services/testimony.service';
import { Testimony } from '../../models/models';
import { Dictionary } from '../../dictionary/dictionary';

@Component({
  selector: 'app-testimonies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonies.component.html',
  styleUrls: ['./testimonies.component.css']
})
export class TestimoniesComponent implements OnInit {
  testimonies: Testimony[] = [];
  readonly Dictionary = Dictionary;
  
  // Form data
  newTestimony = {
    name: '',
    testimony: '',
    isAnonymous: false
  };
  
  isSubmitting = false;
  showSuccessMessage = false;

  constructor(private testimonyService: TestimonyService) {}

  ngOnInit(): void {
    this.loadTestimonies();
  }

  loadTestimonies(): void {
    this.testimonyService.getApprovedTestimonies().subscribe({
      next: (testimonies) => {
        this.testimonies = testimonies;
      },
      error: (error) => console.error('Error loading testimonies:', error)
    });
  }

  submitTestimony(): void {
    if (!this.newTestimony.testimony.trim()) {
      return;
    }

    this.isSubmitting = true;
    
    const testimonyData: Omit<Testimony, 'id' | 'createdAt'> = {
      name: this.newTestimony.isAnonymous ? undefined : this.newTestimony.name.trim() || undefined,
      testimony: this.newTestimony.testimony.trim(),
      isApproved: true // Auto-approve for now
    };

    this.testimonyService.addTestimony(testimonyData).subscribe({
      next: () => {
        this.showSuccessMessage = true;
        this.resetForm();
        this.loadTestimonies();
        this.isSubmitting = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
        
        // Scroll to testimonies section
        setTimeout(() => {
          const element = document.getElementById('testimonies-list');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      },
      error: (error) => {
        console.error('Error submitting testimony:', error);
        this.isSubmitting = false;
      }
    });
  }

  resetForm(): void {
    this.newTestimony = {
      name: '',
      testimony: '',
      isAnonymous: false
    };
  }

  getDisplayName(testimony: Testimony): string {
    return testimony.name || 'Anonymous';
  }

  getInitials(testimony: Testimony): string {
    if (!testimony.name) {
      return 'A';
    }
    const names = testimony.name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    }
    return testimony.name.substring(0, 2).toUpperCase();
  }
}
