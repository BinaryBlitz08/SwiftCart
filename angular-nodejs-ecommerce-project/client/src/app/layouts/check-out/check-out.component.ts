import { Component, OnInit } from '@angular/core';
import { AddressComponent } from '../../components/address/address.component';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CountService } from '../../services/count/count.service';
import { OrderService } from './../../services/order/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    CommonModule,
    AddressComponent,
    FormsModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
  providers: [UserServiceService],
})
export class CheckOutComponent implements OnInit {
  paymentSuccess = false;
  paymentCanceled = false;
  currentStep = 1;
  cart: any[] = [];

  order = {
    products: {} as { [key: string]: number },
    totalPrice: 0,
    address: { street: '', city: '', zip: '' },
    date: new Date(),
    status: 'pending' as 'pending' | 'accepted' | 'rejected',
  };

  street = '';
  city = '';
  zip = '';
 
  isCheck = false;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private orderService: OrderService,
    private countService: CountService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentSuccess = params['success'] === 'true';
      this.paymentCanceled = params['cancel'] === 'true';
      const success = params['success'];
      const cancel = params['cancel'];
      if (cancel) {
        Swal.fire({
          icon: 'error',
          title: 'Payment Cancelled',
          text: 'You cancelled the payment.',
        });
        localStorage.removeItem('paymentHandled');
        return;
      }

      const paymentHandled = localStorage.getItem('paymentHandled');

      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: 'Thank you for your purchase!',
        });
      }

      this.userService.getCart().subscribe({
        next: (response) => {
          this.cart = response.data.map((item: any) => ({
            product: item,
            count: item.count || 1,
          }));

          this.order.products = this.cart.reduce((acc, item) => {
            acc[item.product._id] = item.count;
            return acc;
          }, {});
          
          this.order.totalPrice = this.cart.reduce((acc, item) => {
            return acc + item.product.price * item.count;
          }, 0);

         if (this.paymentSuccess && paymentHandled) {
            this.placeOrder();
            this.userService.clearCart().subscribe({
              next: () => {
                console.log('Cart cleared after payment');
                this.cart = [];
                localStorage.setItem('paymentHandled', 'true'); // ✅ Move this here
              },
              error: (err) => console.error('Cart clear failed:', err),
            });
          }
        },
        error: (error) => console.error(error),
      });
    });
  }

  nextStep() {
  // Optional: Validate address fields
  if (!this.street || !this.city || !this.zip) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Address Info',
      text: 'Please fill in all address fields before continuing.',
    });
    return;
  }

  // Set the address in the order
  this.order.address = {
    street: this.street,
    city: this.city,
    zip: this.zip,
  };

  // Directly initiate payment
  this.handlePayment();
}

  handlePayment() {
    
    const stripeProducts = this.cart.map((item: any) => ({
      name: item.product.name,
      price: Number(item.product.price),
      quantity: item.count,
      image: item.product.images?.[0] || undefined,
    }));

    const payload = {
      items: stripeProducts,
      address: { street: this.street, city: this.city, zip: this.zip },
    };

    console.log(' Sending payload to backend:', payload);

    this.http
      .post<any>('http://localhost:3000/api/payment/create-checkout-session', payload)
      .subscribe({
        next: (res) => {
          if (res.url) {
            localStorage.removeItem('paymentHandled');
            window.location.href = res.url;
          }
        },
        error: (err) => console.error('❌ Payment error:', err),
      });
     
  }

  placeOrder() {
    this.orderService.createOrder(this.order).subscribe({
      next: () => {
        
        this.countService.setProduct(0);
      },
      error: (error) => console.error(error),
    });
  }

 
  setStreet(street: string) {
    this.street = street;
  }

  setCity(city: string) {
    this.city = city;
  }

  setZip(zip: string) {
    this.zip = zip;
  }
}
