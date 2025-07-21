import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../interfaces/product';
import { CountService } from '../count/count.service';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient,private countService: CountService) {}

  // Define the login method
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  // Define the register method
  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  getAllUsers() {
    return this.http
      .get(`${this.apiUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgotPassword`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Reset password with the provided reset token
  resetPassword(newPassword: string, resetToken: string): Observable<any> {
    const data = {
      password: newPassword,
      passwordConfirm: newPassword,
      resetToken: resetToken,
    };
    return this.http
      .patch(`${this.apiUrl}/resetPassword/${resetToken}`, data)
      .pipe(catchError(this.handleError));
  }
  getAllProducts(): Observable<any> {
  return this.http.get(`${environment.apiUrl}/products `).pipe(
    catchError(this.handleError)
  );
}
  getCartSize(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/size`).pipe(
      catchError(this.handleError)
    );
  }
  getProductById(id: string): Observable<Product> {
  return this.http.get<Product>(`${environment.apiUrl}/products/${id}`).pipe(
    catchError(this.handleError)
  );
}
/*************  ✨ Windsurf Command 🌟  *************/
  /**
   * Add a product to the user's cart
   * @param data The ID of the product to add
   * @returns An observable of the updated cart
   */
  addCart(data: string): Observable<any> { 
    const token = localStorage.getItem('token');
    console.log('id ' + data);
    const product = { productId: data };
    return this.http.post(`${this.apiUrl}/cart`, product).pipe(
      // Handle any errors
      catchError(this.handleError),
      tap((response: any) => {
      // Extract cart length (adjust path depending on response shape)
      const cartLength = response?.user?.carts?.length ?? 0;

      // ✅ Set new count in CountService
      this.countService.setProduct(cartLength);
    })
    );
  }
  clearCart(): Observable<any> {
  return this.http.post(`${this.apiUrl}/cart/clear`, {}).pipe(
    catchError(this.handleError),
    tap(() => {
      this.countService.setProduct(0); // Reset cart count
    })
  );
}
  /**
   * Get the user's cart
   * @returns An observable of the user's cart
   */
  getCart(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Fetching cart');
    return this.http.get(`${this.apiUrl}/cart`).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  deleteCart(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('id ' + data);
    const product = { productId: data.productId, type: data.type };
    return this.http.post(`${this.apiUrl}/cart/delete`, product).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  getProductsByCategory(category: string) {
  return this.http.get<Product[]>(`${this.apiUrl}/products?category=${category}`);
}

  getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products/new`).pipe(
      catchError(this.handleError)
    );
  }

  getRecommendedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products/recommended`).pipe(
      catchError(this.handleError)
    );
  }

  getTopDealProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/top-deal`).pipe(
      catchError(this.handleError)
    );
  }
  createStripeCheckoutSession(products: any[]) {
  return this.http.post<{ id: string; url: string }>(
    `${environment.apiUrl}/payment/create-checkout-session `,
    { items: products }
  );

}

  
  // Error handling function
  private handleError(error: HttpErrorResponse) {
    // Handle different types of errors
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server-side error: ${error.status} - ${error.message}`);
    }
    // Return an observable with an error message
    return throwError(
      `An error occurred while trying to Handle request Please try again later.`
    );
  }
  

  public isAdmin(): Boolean {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      return true;
    } else {
      return false;
    }
  }
  public isLoggedIn(): Boolean {
    let IsLoggedInUser = localStorage.getItem('token');
    if (IsLoggedInUser != null) {
      return true;
    } else {
      return false;
    }
  }
}
