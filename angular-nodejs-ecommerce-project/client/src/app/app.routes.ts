import { Routes } from '@angular/router';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { LoginComponent } from './layouts/login/login.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { IsAdminService } from './services/is-admin/is-admin.service';
import { IsUserService } from './services/is-user/is-user.service';
import { IsLoggedService } from './services/is-logged/is-logged.service';
import { IsNotLoggedService } from './services/is-not-logged/is-not-logged.service';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { CheckOutComponent } from './layouts/check-out/check-out.component';
import { CatalogComponent } from './layouts/catalog/catalog.component';
import { ProductOverviewComponent } from './layouts/product-overview/product-overview.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

import { CardIsNotEmptyService } from './services/card-is-not-empty/card-is-not-empty.service';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AccountsOverviewComponent } from './components/accounts-overview/accounts-overview.component';
import { HomeComponent } from './layouts/home/home.component';

export const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: 'accounts-overview', component: AccountsOverviewComponent },
      
      // { path: '', redirectTo: 'accounts', pathMatch: 'full' },
    ],
    canActivate: [IsLoggedService, IsAdminService],
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'product-overview/:id',
    component: ProductOverviewComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'information', component: ProfileInformationComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'address', component: ManageAddressComponent },
      { path: 'password', component: ChangePasswordComponent },
      { path: 'wishlist', component: WishlistComponent },
    ],
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'profile-information',
    component: ProfileInformationComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'manage-address',
    component: ManageAddressComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'wishList',
    component: WishlistComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotLoggedService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsNotLoggedService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [IsLoggedService],
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [IsLoggedService, IsUserService, CardIsNotEmptyService],
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  
];
