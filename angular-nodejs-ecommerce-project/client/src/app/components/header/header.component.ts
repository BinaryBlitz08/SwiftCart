import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { CountService } from '../../services/count/count.service';
import { Product } from '../../interfaces/product';
import { UserServiceService } from '../../services/user/user-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent implements OnInit {
  toggleBurgerMenu = false;
  searchForm: FormGroup;
  searchValue = '';
  searchResults: string[] = [];
  productFilter: Product[] = [];
  products: Product[] = [];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private countService: CountService,
    private userService: UserServiceService,
     private router: Router
  )
   {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.products;
      },
      error: (error) => {
        console.error('404 Not Found');
      },
    });
  }
  data: number = 0;

 
  ngOnInit(): void {
  // Subscribe to BehaviorSubject for cart count
  this.countService.productCount$.subscribe((value: number) => {
    this.data = value;
  });

  // Fetch user cart if logged in
  if (this.userService.isLoggedIn()) {
    this.userService.getCart().subscribe({
      next: (res) => {
        const count = res?.user?.carts?.length || 0;
        this.countService.setProduct(count);
      },
      error: (err) => {
        console.error('Error fetching cart on init:', err);
      }
    });
  }


  this.productService.getAllProducts().subscribe({
    next: (data: any) => {
      this.products = data.products;
    },
    error: (error) => {
      console.error('Error fetching products:', error);
    },
  });
}
selectProduct(product: any) {
  console.log('Navigating to product:', product);
  this.router.navigate(['/product-overview', product._id]);
  this.searchForm.reset();
  this.productFilter = [];
}
  toggleMenu() {
    this.toggleBurgerMenu = !this.toggleBurgerMenu;
  }

  closeMenu() {
    this.toggleBurgerMenu = false;
  }

  search() {
    if (this.searchForm.valid) {
      this.searchValue = this.searchForm.value.search;
      this.productFilter = this.filterProducts(this.searchValue);
    } else this.productFilter = [];
  }
  emptySearch() {
    this.searchForm.reset();
    this.productFilter = [];
  }
  // Function to perform the search (replace with actual search logic)
  filterProducts(term: string): Product[] {
  return this.products.filter(
    (result) => result?.name?.toLowerCase().includes(term.toLowerCase())
  );
}
  isAuthenticated() {
    return this.userService.isLoggedIn();
  }
}
