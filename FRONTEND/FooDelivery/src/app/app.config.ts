import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { GoogleLoginProvider,SocialAuthServiceConfig,FacebookLoginProvider} from '@abacritt/angularx-social-login';

import { MessageService, ConfirmationService } from 'primeng/api';
import {ToastModule} from "primeng/toast";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    BrowserAnimationsModule,
    provideAnimations(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('695631010178-i917jfbar3gsd627n3ec0pk75daglb1m.apps.googleusercontent.com', {
              oneTapEnabled: false,
              prompt: 'consent',
            }),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('440367792002771')
          }
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    MessageService,
    ConfirmationService,
    ToastModule
  ]
};
