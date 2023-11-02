import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { environment } from 'src/environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    importProvidersFrom(
      HttpClientModule,
      NgHttpLoaderModule.forRoot(),
      AuthModule.forRoot({
        ...environment.auth0,
        httpInterceptor: {
          allowedList: [
            `${environment.api.serverUrl}/event`,
            `${environment.api.serverUrl}/event/*`,
          ],
        },
      })
    ),
  ],
};
