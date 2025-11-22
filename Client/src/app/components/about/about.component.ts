import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChurchInfoService } from '../../services/church-info.service';
import { PastorService } from '../../services/pastor.service';
import { ChurchInfo, Pastor } from '../../models/models';
import { Dictionary } from '../../dictionary/dictionary';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  churchInfo: ChurchInfo | null = null;
  pastors: Pastor[] = [];
  readonly Dictionary = Dictionary;

  constructor(
    private churchInfoService: ChurchInfoService,
    private pastorService: PastorService
  ) {}

  ngOnInit(): void {
    this.churchInfoService.getChurchInfo().subscribe({
      next: (info) => {
        this.churchInfo = info;
      },
      error: (error) => console.error('Error loading church info:', error)
    });
    
    this.pastorService.getPastors().subscribe({
      next: (pastors) => {
        this.pastors = pastors;
      },
      error: (error) => console.error('Error loading pastors:', error)
    });
  }
}
