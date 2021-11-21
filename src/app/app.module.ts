import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {
  AppComponent,
  ConfirmComponent,
  HeaderComponent,
  LoanComponent,
  MessageComponent,
  PartnerComponent,
  PartnerModalComponent,
  PartnersComponent
} from './component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    HeaderComponent,
    LoanComponent,
    MessageComponent,
    PartnerComponent,
    PartnerModalComponent,
    PartnersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
