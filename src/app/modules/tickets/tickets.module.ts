import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { TicketCourantComponent } from './ticket-courant/ticket-courant.component';
import { NgxPrintModule } from 'ngx-print';
import { PanneauTicketComponent } from './panneau-ticket/panneau-ticket.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { ModulesRoutingModule } from '../modules-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BarcodeScannerComponent } from "../shared/BarcodeScanner/barcode-scanner/barcode-scanner.component";


@NgModule({
  declarations: [
    ListTicketsComponent,
    NewTicketComponent,
    TicketCourantComponent,
    PanneauTicketComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ModulesRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    SharedModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        },
        extend: true
    }),
    // ngx-print
    NgxPrintModule,
    BarcodeScannerComponent
],
  providers: [DatePipe],
  exports: [
    NewTicketComponent,
    TicketCourantComponent
  ]
})
export class TicketsModule { }
