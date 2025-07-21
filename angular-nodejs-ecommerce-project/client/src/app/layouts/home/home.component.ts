import { Component, OnInit } from '@angular/core';
import Splide from '@splidejs/splide';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';
import { UserServiceService } from '../../services/user/user-service.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
     id: any;
     stock = 10;
    newProducts: Product[] = [];
recommendedProducts: Product[] = [];

     constructor(myRoute: ActivatedRoute, private productService: ProductService, private userService: UserServiceService) {
         this.id = myRoute.snapshot.params['id'];
       }
     
  addToCart(productId: string) {
  this.userService.addCart(productId).subscribe({
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

  ngOnInit(): void {
  this.userService.getNewProducts().subscribe({
   next: (res: any) => {
    this.newProducts = res; 
  
      console.log(res);
      setTimeout(() => {
        new Splide('.splide', {
          type: 'loop',
          focus: 0,
          gap: '1rem',
          padding: '1rem',
          pagination: true,
          arrows: true,
          perPage: 4,
          breakpoints: {
            640: {
              perPage: 2,
            },
            480: {
              perPage: 1,
            },
          },
        }).mount();
      }, 0); // Small delay lets Angular render the DOM first
    },
    error: (err) => console.error('Error loading new products', err),
  });

 
    this.userService.getRecommendedProducts().subscribe({
    next: (data: any) => {
      this.recommendedProducts = data; // or just `data` if backend doesn't wrap in "products"
    },
  
    error: (err) => console.error('Error loading recommended products', err),
  });
}
}