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
    <button mat-icon-button color="primary" (click)="createItem()">
      <mat-icon>add</mat-icon>
    </button>
    <button class="btn" mat-icon-button color="primary" (click)="show()">
    show recent posts
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
  recentPosts:any
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
    this.openUpdateModal('Update Post',true).subscribe((result) => {
      if (result) {
        post.title = result.title ? result.title  : post.title;
        post.body =  result.body ? result.body  : post.body;
        this.crudService.updateItem(post).subscribe();
      }
    });
  }

  createItem(): void {
    this.openUpdateModal('Create New Post',true).subscribe((result) => {
      if (result) {
        const newPost = { title: result.title, body: result.body };
        this.crudService.addItem(newPost).pipe(
          tap((createdPost) => this.posts.unshift(createdPost))
        ).subscribe();
      }
    });
  }

  private openUpdateModal(label?:string,enable?:boolean) {
    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '500px',
      data: {buttonLabel:label,isEnable:enable}
    });

    return dialogRef.afterClosed();
  }

  show(){
    this.openUpdateModal(undefined,false).subscribe((result) => {
      if (result) {
        
      }
    });
  }
}
