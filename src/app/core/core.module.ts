import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { ErrorInterceptorService } from './services/error-interceptor.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  exports : []
})
export class CoreModule { }