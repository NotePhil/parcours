import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { ListPatientsComponent} from './list-patients/list-patients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { TicketsModule } from '../tickets/tickets.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
import { DetailPatientsComponent } from './detail-patients/detail-patients.component';
import { ModulesRoutingModule } from '../../modules-routing.module';

@NgModule({
  declarations: [
    NewPatientComponent,
    ListPatientsComponent,
    DetailPatientsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModulesRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    TicketsModule,
    SharedModule,
    QRCodeModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    })
  ],
  providers: [DatePipe],
})
export class PatientsModule {}