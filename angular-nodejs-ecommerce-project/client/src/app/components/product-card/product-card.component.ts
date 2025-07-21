import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user/user-service.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CountService } from '../../services/count/count.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  providers: [UserServiceService, LocalStorageService],
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  wishListBtn = false;

  constructor(private userService: UserServiceService, private localStorage: LocalStorageService, private countService: CountService) { }

  ngOnInit(): void {
    let products: any = this.localStorage.getItem('wishList');
    if (this.product) {
      if (products && products.some((prod: any) => prod._id === this.product._id)) {
        this.wishListBtn = true;
      }
    }

  }

 addToCart() {
  console.log(this.product._id);
  
  if (!this.product.stock) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'There is not enough quantity in stock!',
    });
    return;
  }

  this.userService.addCart(this.product._id).subscribe({
    next: (data) => {
      console.log('Add to cart response:', data); 
       const updatedCartLength = data.cart.length;
      this.countService.setProduct(updatedCartLength);
      Swal.fire({
        icon: 'success',
        title: 'Great!',
        text: 'Product Added To Your Cart Successfully'
      });
    },
    error: (error) => {
      console.error('Error adding to cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add product to cart!',
      });
    }
  });
}

  addProductToWishList() {
    let products: any;
    if (this.localStorage.getItem('wishList')) {
      products = this.localStorage.getItem('wishList');
      if (products.some((prod: any) => prod._id === this.product._id)) {
        products = products.filter((prod: any) => prod._id !== this.product._id);
      } else {
        products.push(this.product)
      }
      this.localStorage.setItem('wishList', products);
    } else {
      products = [];
      products.push(this.product);
      this.localStorage.setItem('wishList', products);
    }
  }
}
