import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/models';
import { Dictionary } from '../../dictionary/dictionary';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = [];
  readonly Dictionary = Dictionary;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: (error) => console.error('Error loading branches:', error)
    });
  }
}
