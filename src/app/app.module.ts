import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HomeComponent } from './user/home/home.component';
import { AdminModule } from './admin/admin.module';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, UserModule, AdminModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: '*', component: HomeComponent },
      { path: '**', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ])
  ],
  providers: [ CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
