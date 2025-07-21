import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { UserServiceService } from '../../services/user/user-service.service';
import Swal from 'sweetalert2';
import { recommendation } from '../../Utils/products';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [LoadingSpinnerComponent,CommonModule],
  providers: [ProductService, UserServiceService],
  templateUrl: './product-overview.component.html',
  styles: ``
})
export class ProductOverviewComponent {
  id: any;
  product: Product | undefined;
  primaryImage = '';
  availability = '';
  stock = 0;
  recommendationProduct = recommendation;
  isLoading = true;
  wishListBtn = false;

  // 👇 Added to store all products
  allProducts: Product[] = [];

  constructor(
    private myRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserServiceService,
    private localStorage: LocalStorageService
  ) {
    
  }

 ngOnInit(): void {
  this.myRoute.params.subscribe(params => {
    this.id = params['id'];
    this.loadProduct();
  });

  // Load all products once
  this.userService.getAllProducts().subscribe({
    next: (data) => {
      this.allProducts = data;
    },
    error: (err) => console.error(err)
  });
}

loadProduct(): void {
  this.isLoading = true;
  this.userService.getProductById(this.id).subscribe({
    next: (data) => {
      this.product = data;
      this.stock = data.stock;
      this.isLoading = false;

      const wishList: any = this.localStorage.getItem('wishList');
      if (this.product && wishList?.some((prod: any) => prod._id === this.product?._id)) {
        this.wishListBtn = true;
      } else {
        this.wishListBtn = false;
      }
    },
    error: (error) => console.error(error)
  });
}

  activeImage(image: string) {
    this.primaryImage = image;
  }

  checkAvailability(): boolean {
    return this.stock > 0;
  }

  addToCart() {
    if (!this.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is no enough quantity in the stock!',
      });
      return;
    }

    this.userService.addCart(this.id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'Product Added To Your Cart Successfully'
        });
      },
      error: (error) => console.error(error)
    });
  }
  addProductToWishList() {
    let products: any;
    if (this.localStorage.getItem('wishList')) {
      products = this.localStorage.getItem('wishList');
      if (products.some((prod: any) => prod._id === this.product?._id)) {
        products = products.filter((prod: any) => prod._id !== this.product?._id);
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
