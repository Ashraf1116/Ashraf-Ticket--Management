// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

// bootstrapApplication(App, {
//   providers: [provideRouter(routes)]
// }).catch(err => console.error(err));
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
      provideHttpClient(withFetch())   // 👈 ADD THIS
  ]
}).catch(err => console.error(err));
