import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './pages/message/message.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {APP_ROUTES} from './app.routes';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ApiService } from './services/api.service';
import { ListComponent } from './pages/message/list/list.component';
import { DetailComponent } from './pages/message/detail/detail.component'
import {ValidationInterceptor} from './interceptor/validation.interceptor';
import { FileComponent } from './pages/message/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NavbarComponent,
    ListComponent,
    DetailComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidationInterceptor,
      multi: true
    },
    ApiService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
