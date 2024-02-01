import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
  updatedTitle: string = '';
  updatedBody: string = '';

  constructor(public dialogRef: MatDialogRef<UpdateModalComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
