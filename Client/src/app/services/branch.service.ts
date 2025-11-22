import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Branch } from '../models/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor(private localStorage: LocalStorageService) { }

  getBranches(): Observable<Branch[]> {
    const branches = this.localStorage.getBranches();
    const pastors = this.localStorage.getPastors();
    
    // Attach pastors to branches
    const branchesWithPastors = branches.map(branch => ({
      ...branch,
      pastors: pastors.filter(p => p.branchId === branch.id)
    }));
    
    return of(branchesWithPastors).pipe(delay(100));
  }

  getBranch(id: number): Observable<Branch> {
    const branches = this.localStorage.getBranches();
    const pastors = this.localStorage.getPastors();
    const branch = branches.find(b => b.id === id);
    
    if (branch) {
      const branchWithPastors = {
        ...branch,
        pastors: pastors.filter(p => p.branchId === branch.id)
      };
      return of(branchWithPastors).pipe(delay(100));
    }
    
    throw new Error('Branch not found');
  }

  createBranch(branch: Branch): Observable<Branch> {
    const newBranch = this.localStorage.addBranch(branch);
    return of(newBranch).pipe(delay(100));
  }

  updateBranch(id: number, branch: Branch): Observable<void> {
    this.localStorage.updateBranch(id, branch);
    return of(void 0).pipe(delay(100));
  }

  deleteBranch(id: number): Observable<void> {
    this.localStorage.deleteBranch(id);
    return of(void 0).pipe(delay(100));
  }
}
