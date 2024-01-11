import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ModalCategoriesComponent } from './modal-categories/modal-categories.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalChoixAttributsComponent } from './modal-choix-attributs/modal-choix-attributs.component';
import { ModalChoixPreconisationsComponent } from './modal-choix-preconisations/modal-choix-preconisations.component';
//import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalCodebarreComponent } from './modal-codebarre/modal-codebarre.component';
import { ModalCodebarreDialogComponent } from './modal-codebarre-dialog/modal-codebarre-dialog.component';
import { ModalCodebarreScanContinueComponent } from './modal-codebarre-scan-continue/modal-codebarre-scan-continue.component';

@NgModule({
  declarations: [
    ModalCategoriesComponent,
    ModalChoixAttributsComponent,
    ModalChoixPreconisationsComponent,
    ModalCodebarreComponent,
    ModalCodebarreDialogComponent,
    ModalCodebarreScanContinueComponent,
  ],
  exports: [
    ModalCategoriesComponent,
    ModalChoixAttributsComponent,
    ModalCodebarreComponent,
    ModalCodebarreDialogComponent,
    ModalCodebarreScanContinueComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    //MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    //MatCheckboxModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
  ],
  providers: [],
})
export class SharedModule {}
