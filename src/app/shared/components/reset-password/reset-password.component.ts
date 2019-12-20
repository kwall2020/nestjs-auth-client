import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close({
        ...form.value
      });
    }
  }
}
