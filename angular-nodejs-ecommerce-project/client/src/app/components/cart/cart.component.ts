import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UserServiceService } from '../../services/user/user-service.service';
import { CountService } from '../../services/count/count.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

interface Item {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string;
  count: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  providers: [UserServiceService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'], 
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  fakeItems: Item[] = [];
  isLoading = true;

  constructor(
    private userService: UserServiceService,
    private countService: CountService
  ) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart(): void {
    this.userService.getCart().subscribe({
      next: (response) => {
        this.fakeItems = response.data;
        this.calculateTotalPrice();
        this.countService.setProduct(this.fakeItems.length); 
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  increaseQuantity(item: Item): void {
    if (item.count >= item.stock) return;

    item.count++;

    this.userService.addCart(item._id).subscribe({
      next: () => {
        this.countService.setProduct(this.fakeItems.length);
        this.calculateTotalPrice();
      },
      error: (error) => console.error(error),
    });
  }

  decreaseQuantity(item: Item): void {
    if (item.count > 1) {
      item.count--;

      const removeData = {
        productId: item._id,
        type: 'remove',
      };

      this.userService.deleteCart(removeData).subscribe({
        next: () => {
          this.countService.setProduct(this.fakeItems.length);
          this.calculateTotalPrice();
        },
        error: (error) => console.error(error),
      });
    }
  }

  removeItem(item: Item): void {
    const index = this.fakeItems.findIndex((i) => i._id === item._id);
    if (index > -1) {
      this.fakeItems.splice(index, 1);

      const removeData = {
        productId: item._id,
        type: 'removeAll',
      };

      this.userService.deleteCart(removeData).subscribe({
        next: () => {
          this.countService.setProduct(this.fakeItems.length);
          this.calculateTotalPrice();
        },
        error: (error) => console.error(error),
      });
    }
  }
  

  calculateTotalPrice(): void {
    this.totalPrice = this.fakeItems.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);
  }
}