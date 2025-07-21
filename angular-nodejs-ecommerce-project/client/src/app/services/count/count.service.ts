import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  private productCount = new BehaviorSubject<number>(0);
  productCount$ = this.productCount.asObservable(); // use this in .subscribe

  setProduct(count: number): void {
    this.productCount.next(count);
  }
}