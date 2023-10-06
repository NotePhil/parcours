import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewPersonnelComponent } from './new-personnel/new-personnel.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
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
import {MatRadioModule} from '@angular/material/radio';
import { ListPersonnelsComponent } from './list-personnels/list-personnels.component';
import { RolesPersonnelComponent } from './roles-personnel/roles-personnel.component';


@NgModule({
  declarations: [
    NewPersonnelComponent,
    ListPersonnelsComponent,
    RolesPersonnelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    TicketsModule,
    MatRadioModule,
    
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        },extend:true
      }),
      BrowserModule
    ],
    providers: [DatePipe],
})
export class PersonnelsModule { }
