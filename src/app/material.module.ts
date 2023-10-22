// material.module.ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MaterialComponents = [
  MatProgressSpinnerModule,MatToolbarModule,MatDatepickerModule,MatTableModule,
    MatButtonModule,MatSelectModule,MatPaginatorModule,MatSidenavModule,
    MatIconModule,MatNativeDateModule,MatSortModule,MatListModule,
    MatFormFieldModule,MatInputModule,MatDialogModule,
    MatSnackBarModule,MatCheckboxModule,MatMenuModule
    // ...other modules
];

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
  })
export class MaterialModule { }
