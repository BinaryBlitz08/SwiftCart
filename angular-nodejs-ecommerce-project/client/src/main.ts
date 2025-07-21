import { bootstrapApplication } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { userInterceptorInterceptor } from './app/interceptors/user/user-interceptor.interceptor';


// Merge all providers
const mergedProviders = [
  ...appConfig.providers,
  provideCharts(withDefaultRegisterables()),
  provideHttpClient(withInterceptors([userInterceptorInterceptor])),
];

// Bootstrap application with all merged providers
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: mergedProviders,
}).catch((err) => console.error(err));