import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewCaisseComponent } from './new-caisse/new-caisse.component';
import { ListCaissesComponent } from './list-caisses/list-caisses.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AttributsRoutingModule } from '../attributs/attributs-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModulesRoutingModule } from '../modules-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    NewCaisseComponent,
    ListCaissesComponent
  ],
  imports: [
    CommonModule,
    AttributsRoutingModule,
    FormsModule,
    ModulesRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        },
        extend:true
    })
  ],
  providers: [DatePipe],
})
export class CaissesModule { }
