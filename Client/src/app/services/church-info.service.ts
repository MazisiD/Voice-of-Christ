import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ChurchInfo } from '../models/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChurchInfoService {
  constructor(private localStorage: LocalStorageService) { }

  getChurchInfo(): Observable<ChurchInfo> {
    const info = this.localStorage.getChurchInfo();
    if (info) {
      return of(info).pipe(delay(100));
    }
    throw new Error('Church info not found');
  }

  updateChurchInfo(id: number, churchInfo: ChurchInfo): Observable<void> {
    this.localStorage.updateChurchInfo(churchInfo);
    return of(void 0).pipe(delay(100));
  }
}
