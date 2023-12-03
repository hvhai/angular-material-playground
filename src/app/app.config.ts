import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { SpinnerInterceptorService } from './shared/services/spinner-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    importProvidersFrom(
      HttpClientModule,
      AuthModule.forRoot({
        ...environment.auth0,
        httpInterceptor: {
          allowedList: [
            `${environment.api.serverUrl}/event`,
            `${environment.api.serverUrl}/event/*`,
            `${environment.api.serverUrl}/events`,
            `${environment.api.serverUrl}/events/*`,
            `${environment.api.serverUrl}/admin/*`,
          ],
        },
      })
    ),
  ],
};
