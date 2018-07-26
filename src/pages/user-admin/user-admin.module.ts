import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAdminPage } from './user-admin';
@NgModule({
  declarations: [
    UserAdminPage
  ],
  imports: [
    IonicPageModule.forChild(UserAdminPage),
  ],
})
export class UserAdminPageModule {}
