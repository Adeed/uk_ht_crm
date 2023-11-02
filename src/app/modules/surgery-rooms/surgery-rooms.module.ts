import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../../material.module'; 


import { SurgeryRoomsComponent } from './surgery-rooms/surgery-rooms.component';

const routes: Routes = [
  { path: '', component: SurgeryRoomsComponent, children: [ ]}
];


@NgModule({
  declarations: [
    SurgeryRoomsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DefaultSlotsModule { }
