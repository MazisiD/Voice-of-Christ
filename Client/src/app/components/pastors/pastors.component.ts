import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastorService } from '../../services/pastor.service';
import { Pastor } from '../../models/models';
import { Dictionary } from '../../dictionary/dictionary';

@Component({
  selector: 'app-pastors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pastors.component.html',
  styleUrls: ['./pastors.component.css']
})
export class PastorsComponent implements OnInit {
  pastors: Pastor[] = [];
  readonly Dictionary = Dictionary;

  constructor(private pastorService: PastorService) {}

  ngOnInit(): void {
    this.pastorService.getPastors().subscribe({
      next: (pastors) => {
        this.pastors = pastors;
      },
      error: (error) => console.error('Error loading pastors:', error)
    });
  }
}
