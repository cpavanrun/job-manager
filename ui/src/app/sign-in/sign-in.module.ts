import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatCardModule} from '@angular/material';

import {SignInComponent} from './sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
  ],
  declarations: [
    SignInComponent,
  ],
  exports: []
})
export class SignInModule {}
