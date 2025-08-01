import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly API_URL: string = `${environment.apiUrl}/profile`;
  constructor(private http: HttpClient) {}

  getAllProfile() {
    return this.http.get(this.API_URL + '/all');
  }

  getProfile() {
    return this.http.get(this.API_URL + '/view');
  }

  updateProfile(data: any) {
    return this.http.patch(this.API_URL + '/edit', data);
  }

  adminUpdateProfile(data: any) {
    return this.http.patch(this.API_URL + '/admin/edit', data);
  }

  updatePassword(data: any) {
    return this.http.patch(this.API_URL + '/password', data);
  }
  updateImage(data: any) {
    const formData = new FormData();
    formData.append('image', data);
    return this.http.patch(this.API_URL + '/updateImage', formData);
  }
  getUsersCharts() {
    return this.http.get(this.API_URL + '/charts');
  }
  adminUpdateImage(data: any, username?: string) {
    const formData = new FormData();
    formData.append('image', data);
    if (username) {
      formData.append('username', username);
    }
    return this.http.patch(this.API_URL + '/admin/updateImage', formData);
  }
  adminDeleteUser(username: string) {
    return this.http.delete(this.API_URL + '/admin/delete', {
      body: { username: username },
    });
  }
}
