import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { ErrorComponent } from './components/error/error.component';

import { GithubService } from './services/github.service';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserComponent } from './components/user/user.component';

import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ErrorComponent,
    UserComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
