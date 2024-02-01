import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateModalComponent } from './updateModalcomponent/UpdateModalComponent';
import { tap } from 'rxjs';
@Component({
  selector: 'app-carousel',
  template: `
    <div>
      <carousel *ngIf="posts?.length > 0">
      <div class="create-item">
    <button class="btn" mat-icon-button color="primary" (click)="createItem()">
      <mat-icon>add</mat-icon>
    </button>
  </div>
        <slide *ngFor="let post of posts; let i = index">
          <div class="carousel-caption">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <div class="carousel-actions">
              <button
                mat-icon-button
                color="primary"
                (click)="updateItem(post)"
              >
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteItem(i)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  `,
  styleUrl: 'carousal.css',
})
export class CarouselComponent implements OnInit {
  posts: any;
  constructor(public crudService: CrudService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.crudService.getItems().subscribe((res) => {
      this.posts = res;
      console.log(this.posts);
    });
  }
  deleteItem(index: number) {
    this.posts.splice(index, 1);
  }
  updateItem(post: any): void {
    this.openUpdateModal(post).subscribe((result) => {
      if (result) {
        post.title = result.title ? result.title  : post.title;
        post.body =  result.body ? result.body  : post.body;
        this.crudService.updateItem(post).subscribe();
      }
    });
  }

  createItem(): void {
    this.openUpdateModal().subscribe((result) => {
      if (result) {
        const newPost = { title: result.title, body: result.body };
        this.crudService.addItem(newPost).pipe(
          tap((createdPost) => this.posts.unshift(createdPost))
        ).subscribe();
      }
    });
  }

  private openUpdateModal(post?: any) {
    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '300px',
      data: post || {} // Pass post data if available
    });

    return dialogRef.afterClosed();
  }
}
