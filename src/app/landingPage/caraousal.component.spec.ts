import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CarouselComponent } from './caraousal.component';
import { CrudService } from '../crud.service';
import { UpdateModalComponent } from './updateModalcomponent/UpdateModalComponent';
import { MatIconModule } from '@angular/material/icon';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['getItems', 'addItem', 'updateItem']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      imports: [BrowserAnimationsModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete item', () => {
    component.posts = [{ title: 'Post 1', body: 'Body 1' }, { title: 'Post 2', body: 'Body 2' }];

    component.deleteItem(0);

    expect(component.posts).toEqual([{ title: 'Post 2', body: 'Body 2' }]);
  });

  it('should update item', () => {
    const mockPost = { title: 'Post 1', body: 'Body 1' };
    dialogSpy.open.and.returnValue({ afterClosed: () => of({ title: 'Updated Title' }) } as any);
    crudServiceSpy.updateItem.and.returnValue(of({}));

    component.updateItem(mockPost);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(crudServiceSpy.updateItem).toHaveBeenCalledWith({
      title: 'Updated Title',
      body: 'Body 1',
    });
  });
  it('should open update modal for recent posts', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of({}) } as any);

    component.show();

    expect(dialogSpy.open).toHaveBeenCalled();
  });
});
