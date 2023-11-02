import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserReadComponent } from './user-read/user-read.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';



@NgModule({
  declarations: [
    UserCreateComponent,
    UserReadComponent,
    UserUpdateComponent,
    UserDeleteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
