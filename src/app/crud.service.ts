import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private cache: { [key: string]: any[] } = {}; 

  constructor(private http: HttpClient) {}

 getItems(): Observable<any[]> {
    const cacheKey = 'getItems';

    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    } else {
      return this.http.get<any[]>(`${this.apiUrl}/posts`).pipe(
        catchError(error => {
          console.error('Error fetching items:', error);
          return of([]); // Return an empty array on error
        })
      );
    }
  }

  addItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, item);
  }

  updateItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/${item.id}`, item);
  }

}
