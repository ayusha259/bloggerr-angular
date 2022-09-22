import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IsLoadingService {
  loading = new BehaviorSubject<boolean>(false);
}
