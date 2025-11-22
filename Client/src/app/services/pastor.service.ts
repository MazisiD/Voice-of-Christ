import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Pastor } from '../models/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PastorService {
  constructor(private localStorage: LocalStorageService) { }

  getPastors(): Observable<Pastor[]> {
    const pastors = this.localStorage.getPastors();
    const branches = this.localStorage.getBranches();
    
    // Attach branch info to pastors
    const pastorsWithBranches = pastors.map(pastor => ({
      ...pastor,
      branch: branches.find(b => b.id === pastor.branchId)
    }));
    
    return of(pastorsWithBranches).pipe(delay(100));
  }

  getPastor(id: number): Observable<Pastor> {
    const pastors = this.localStorage.getPastors();
    const branches = this.localStorage.getBranches();
    const pastor = pastors.find(p => p.id === id);
    
    if (pastor) {
      const pastorWithBranch = {
        ...pastor,
        branch: branches.find(b => b.id === pastor.branchId)
      };
      return of(pastorWithBranch).pipe(delay(100));
    }
    
    throw new Error('Pastor not found');
  }

  getPastorsByBranch(branchId: number): Observable<Pastor[]> {
    const pastors = this.localStorage.getPastors();
    const branches = this.localStorage.getBranches();
    const branch = branches.find(b => b.id === branchId);
    
    const branchPastors = pastors
      .filter(p => p.branchId === branchId)
      .map(pastor => ({
        ...pastor,
        branch
      }));
    
    return of(branchPastors).pipe(delay(100));
  }

  createPastor(pastor: Pastor): Observable<Pastor> {
    const newPastor = this.localStorage.addPastor(pastor);
    return of(newPastor).pipe(delay(100));
  }

  updatePastor(id: number, pastor: Pastor): Observable<void> {
    this.localStorage.updatePastor(id, pastor);
    return of(void 0).pipe(delay(100));
  }

  deletePastor(id: number): Observable<void> {
    this.localStorage.deletePastor(id);
    return of(void 0).pipe(delay(100));
  }
}
