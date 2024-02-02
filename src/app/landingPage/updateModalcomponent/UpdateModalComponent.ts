import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  updatedTitle: string = '';
  updatedBody: string = '';
  constructor(public dialogRef: MatDialogRef<UpdateModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { buttonLabel: string, isEnable: boolean },private readonly crud:CrudService) {}

  ngOnInit(): void {

  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
